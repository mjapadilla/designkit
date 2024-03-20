import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useErrorNotice } from 'hooks/setErrorNotice';

import Button from './_Button';

type TProps = {
  label: string;
};

function SaveForm({ label = 'sdf' }: TProps) {
  const { updateError } = useErrorNotice();

  const {
    reset,
    formState: { isDirty },
  } = useFormContext() ?? {};

  const onReset = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
    updateError({});
  };

  return (
    <div
      className={classNames('h-20 transform duration-200 ease-in-out', {
        'bg-zinc-700': !isDirty,
        'bg-primary-500': isDirty,
      })}
    >
      <div className="container mx-auto flex h-full px-5 py-3">
        <h4 className="text-bold text-white my-auto text-lg text">
          {!isDirty ? label : 'There are unsaved changes'}
        </h4>
        <div className="my-auto ml-auto">
          <div className="flex space-x-2">
            {isDirty && (
              <Button
                color="brand"
                label="Discard"
                disabled={!isDirty}
                onClick={onReset}
                className="text-bold px-4 text-lg text-red-600"
              />
            )}
            <Button
              type="submit"
              color="brand"
              label="Save"
              disabled={!isDirty}
              className="text-bold px-4 text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveForm;
