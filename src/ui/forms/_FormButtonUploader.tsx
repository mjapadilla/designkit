import classNames from 'classnames';
import React from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { FaImage } from 'react-icons/fa6';
import uploadcare, {
  TProgress,
  TUploadCareFile,
  TValidator,
} from 'uploadcare-widget';

import { autoCropFace, getUseStateValue } from 'utils';

const UPLOADCARE_KEY = import.meta.env.VITE_UPLOADCARE_KEY;

type TTabs = 'file' | 'url' | 'camera';

export type TCommonProps = {
  id?: string;
  tabs?: TTabs[];
  disabled?: boolean;
  isImageOnly?: boolean;
  crop?: 'face' | 'free';
};

type TProps<T> =
  | ({
      register?: false;
      name: string;
      value: boolean;
      onChange: React.Dispatch<React.SetStateAction<T>>;
    } & TCommonProps)
  | ({
      register: FieldValues;
      name?: string;
      value?: boolean;
      onChange?: false;
    } & TCommonProps);

const InputComponent = <T,>({
  name,
  onChange,
  crop = 'free',
  disabled = false,
  isImageOnly = true,
  id = 'button-uploader',
  tabs = ['file', 'url'],
}: Omit<TProps<T>, 'register'>) => {
  const isOnChange = typeof onChange === 'function';

  const [isUploading, setUploading] = React.useState(false);
  const [progressCount, setProgressCount] = React.useState(0);

  const imagesOnly = ({ isImage, mimeType }: TValidator) => {
    if (isImage === false) {
      setUploading(false);
      setProgressCount(0);
      throw new Error('image');
    }

    if (['image/gif'].indexOf(mimeType) > -1) {
      setUploading(false);
      setProgressCount(0);
      throw new Error('image');
    }
  };

  const handleProgress = ({ state, progress }: TProgress) => {
    if (state === 'uploading') {
      setUploading(true);
      setProgressCount(Math.ceil(progress * 100));
    }
    if (state === 'uploaded') {
      setUploading(true);
      setProgressCount(100);
    }

    if (state === 'ready') {
      setUploading(false);
      setProgressCount(0);
    }
  };

  const handleDone = async (data: TUploadCareFile) => {
    const file_url =
      crop === 'face' ? await autoCropFace(data.originalUrl) : data?.cdnUrl;
    if (isOnChange) {
      onChange((prev: T) => ({
        ...prev,
        [name as never]: file_url,
      }));
      return;
    }
  };

  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    uploadcare
      .openDialog(null, {
        publicKey: UPLOADCARE_KEY,
        tabs,
        crop: crop === 'face' ? false : crop,
        imagesOnly: isImageOnly,
        validators: [imagesOnly],
      })
      .done((file) => {
        file?.progress(handleProgress).done(handleDone);
      });
  };

  const progress = React.useMemo(() => {
    if (isUploading) {
      return <span>{progressCount}%</span>;
    }
    return '';
  }, [isUploading, progressCount]);

  return (
    <div
      className={classNames({
        'cursor-wait': isUploading,
      })}
    >
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={handleUpload}
        className={classNames('md primary btn px-3', {
          'pointer-events-none': isUploading,
        })}
      >
        <div className="flex items-center space-x-2">
          {isUploading ? progress : <FaImage className="text-white h-5 w-5" />}
          <h4 className="text-md">Upload Photo</h4>
        </div>
      </button>
    </div>
  );
};

function FormButtonUploader<T>({ register, ...rest }: TProps<T>) {
  const { control } = useFormContext() ?? {};
  return (
    <>
      {!register ? (
        <InputComponent {...rest} />
      ) : (
        <Controller
          control={control}
          name={register?.name}
          render={({ field: { onChange, value, name } }) => (
            <InputComponent
              {...rest}
              name={name}
              value={value}
              onChange={($v: React.SetStateAction<typeof value>) => {
                const v = getUseStateValue(value, $v);
                onChange(v[name]);
              }}
            />
          )}
        />
      )}
    </>
  );
}

export default FormButtonUploader;
