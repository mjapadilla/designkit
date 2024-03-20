import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';

import { ImagePlaceholder } from 'assets/images';

function IconLoader() {
  return (
    <svg
      className="animate-spin text-slate-600"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface IProps {
  src: string;
  defaultSrc?: string;
  className?: string;
}

function ViewImage({
  className = '',
  src,
  defaultSrc = ImagePlaceholder,
}: IProps) {
  const [url, setUrl] = React.useState<string>(src);
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

  const handleLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
  };

  const handleError = () => {
    setTimeout(() => {
      setUrl(defaultSrc);
      setImageLoaded(true);
    }, 1000);
  };

  React.useLayoutEffect(() => {
    if (!isEmpty(src)) {
      setUrl(src);
    }
    return () => {
      setUrl('');
    };
  }, [src]);

  return (
    <div
      className={classNames(
        'group relative flex items-center justify-center overflow-hidden rounded bg-slate-200',
        {
          [`${className}`]: className,
          'h-24 w-24': !className,
        }
      )}
    >
      {!imageLoaded && (
        <div className="absolute h-full w-full">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-4 w-4">
              <IconLoader />
            </div>
          </div>
        </div>
      )}
      <img
        src={url}
        alt=""
        className="h-full w-auto object-contain"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

export default ViewImage;
