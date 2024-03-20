import classNames from 'classnames';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

type TCommonProps = {
  id?: string;
  error?: string;
  type?: 'email' | 'password' | 'text' | 'number';
  disabled?: boolean;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  labelClassName?: string;
  errorClassName?: string;
  leading?: React.ReactNode;
  withShowPassword?: boolean;
  iconAlignClassName?: string;
  containerClassName?: string;
  disableIconInputFocus?: boolean;
};

type TProps<T> =
  | ({
      readonly: true;
      register?: false;
      value: string;
      name: string;
      onChange?: false;
    } & TCommonProps)
  | ({
      readonly?: false;
      register?: false;
      name: string;
      value: string;
      onChange: React.Dispatch<React.SetStateAction<T>>;
    } & TCommonProps)
  | ({
      readonly?: false;
      register: FieldValues;
      name?: string;
      value?: string;
      onChange?: false;
    } & TCommonProps);

function FormInput<T>({
  id,
  name,
  icon,
  error,
  label,
  value,
  leading,
  required,
  register,
  readonly,
  onChange,
  autoFocus,
  className,
  placeholder,
  type = 'text',
  errorClassName,
  labelClassName,
  withShowPassword,
  disabled = false,
  containerClassName,
  iconAlignClassName,
  disableIconInputFocus,
}: TProps<T>) {
  const isOnChange = typeof onChange === 'function';

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleOnShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOnChange && Boolean(!register)) {
      onChange((prev: T) => ({
        ...prev,
        [name as never]: e?.target.value,
      }));
      return;
    }
  };

  return (
    <div className="relative w-full">
      <div className={classNames('form-container group', containerClassName)}>
        {label && (
          <label
            className={classNames('form-label', labelClassName)}
            htmlFor={id ?? name}
            {...(register && { ...register, htmlFor: register?.name })}
          >
            <span>{label}</span>
            {required ? <span className="text-red-500">*</span> : ''}
          </label>
        )}
        <div className="relative">
          {leading && (
            <div className="absolute inset-y-0 left-0 flex items-center">
              <span
                className={classNames('transition duration-300 ease-in-out', {
                  'form-input-leading-error': error,
                  'form-input-leading': !error,
                })}
              >
                {leading}
              </span>
            </div>
          )}
          <input
            autoComplete="off"
            id={id ?? name}
            name={name}
            readOnly={readonly}
            disabled={disabled}
            value={value}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChange={handleOnChange}
            {...(!register && { required })}
            {...(register && { ...register, id: register?.name })}
            type={
              withShowPassword ? `${showPassword ? 'text' : 'password'}` : type
            }
            className={classNames('form-input', className, {
              'form-input-error': error,
              'pl-10': leading,
              'pl-3 pr-8': icon,
              'pr-9': withShowPassword,
            })}
          />
          <>
            {withShowPassword ? (
              <span
                onClick={handleOnShowPassword}
                role="presentation"
                className={classNames(
                  'absolute right-3.5 top-0 flex h-full cursor-pointer items-center',
                  {
                    'form-input-error': error,
                  }
                )}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            ) : (
              <>
                {icon && (
                  <span
                    className={classNames(
                      'absolute top-0 flex h-full items-center',
                      iconAlignClassName
                    )}
                    onClick={() => {
                      if (!disableIconInputFocus) return;
                      const x = document.activeElement;
                      setTimeout(() => {
                        if (x instanceof HTMLElement) {
                          x.blur();
                        }
                      }, 100);
                    }}
                    role="presentation"
                  >
                    {icon}
                  </span>
                )}
              </>
            )}
          </>
        </div>
      </div>
      {error && (
        <small className={classNames('form-error-badge', errorClassName)}>
          {error ?? ''}
        </small>
      )}
    </div>
  );
}

export default FormInput;
