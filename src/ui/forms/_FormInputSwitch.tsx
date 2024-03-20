import classNames from 'classnames';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { getUseStateValue } from 'utils';

type TCommonProps = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  disableOnOff?: boolean;
  labelClassName?: string;
  activeClassName?: string;
  label?: string | React.ReactNode;
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

const activeIcon = (
  <svg
    className="h-5 w-5 text-green-600"
    fill="currentColor"
    viewBox="0 0 12 12"
  >
    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
  </svg>
);

const loadingIcon = (
  <svg
    className="h-5 w-5 animate-spin"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
      clipRule="evenodd"
    />
  </svg>
);

const inactiveIcon = (
  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 12 12">
    <path
      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InputComponent = <T,>({
  name,
  value,
  onChange,
  disabled,
  required,
  isLoading,
  className,
  labelClassName,
  disableOnOff = true,
  activeClassName = 'bg-green-600 text-primary-500',
  label = 'Name',
}: Omit<TProps<T>, 'register'>) => {
  const isOnChange = typeof onChange === 'function';

  const handleOnSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOnChange) {
      onChange((prev: T) => ({
        ...prev,
        [name as never]: !value,
      }));
      return;
    }
  };

  return (
    <div
      className={classNames('relative', {
        'flex items-center gap-3': label,
        'flex items-center justify-center': !label,
      })}
    >
      <button
        type="button"
        className={classNames(
          'relative inline-flex h-8 w-16 flex-shrink-0 items-center focus:outline-none',
          'rounded-full border-2 border-transparent ',
          'transition-colors duration-200 ease-in-out ',
          className,
          {
            'bg-gray-200': !value,
            [activeClassName]: value,
          },
          {
            'cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
          }
        )}
        onClick={handleOnSwitch}
        disabled={disabled}
      >
        {!disableOnOff && (
          <div
            className={classNames(
              'pointer-events-none absolute flex h-5 w-full items-center rounded-full transition duration-200 ease-in-out'
            )}
          >
            <span
              className={classNames(
                'text-white my-auto ml-2 text-xxs font-semibold',
                {
                  hidden: !value,
                  block: value,
                }
              )}
            >
              On
            </span>
            <span
              className={classNames(
                'my-auto ml-auto mr-2 text-xxs font-semibold text-gray-500',
                {
                  block: !value,
                  hidden: value,
                }
              )}
            >
              Off
            </span>
          </div>
        )}
        <span className="sr-only">SWITCH</span>
        <div
          className={classNames(
            'transform transition duration-200 ease-in-out',
            'bg-white rounded-full shadow ring-0',
            'pointer-events-none relative inline-block h-6 w-6',
            {
              'translate-x-1': !value,
              'translate-x-8': value,
            }
          )}
        >
          <span
            className={classNames(
              'flex items-center justify-center',
              'absolute inset-0 h-full w-full',
              'transition-opacity duration-150 ease-in',
              {
                'opacity-100': !value,
                'opacity-0': value,
              }
            )}
          >
            {isLoading ? loadingIcon : inactiveIcon}
          </span>
          <span
            className={classNames(
              'flex items-center justify-center',
              'absolute inset-0 h-full w-full',
              'transition-opacity duration-100 ease-out',
              {
                'opacity-0': !value,
                'opacity-100': value,
              }
            )}
          >
            {isLoading ? loadingIcon : activeIcon}
          </span>
        </div>
      </button>
      {label && (
        <h4 className={classNames('form-label mb-0', labelClassName)}>
          {label} {required ? <span className="text-red-500">*</span> : ''}
        </h4>
      )}
    </div>
  );
};

function FormInputSwitch<T>({ register, ...rest }: TProps<T>) {
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

export default FormInputSwitch;
