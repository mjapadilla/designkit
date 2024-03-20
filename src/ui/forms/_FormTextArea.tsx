import classNames from 'classnames';
import React from 'react';
import { FieldValues } from 'react-hook-form';

type TCommonProps = {
  id?: string;
  error?: string;
  type?: string;
  rows?: number;
  placeholder?: string;
  className?: string;
  required?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
  errorClassName?: string;
  leading?: React.ReactNode;
  containerClassName?: string;
  disableIconInputFocus?: boolean;
};

type TProps<T> =
  | ({
      register?: false;
      name: string;
      value: string;
      onChange: React.Dispatch<React.SetStateAction<T>>;
    } & TCommonProps)
  | ({
      register: FieldValues;
      name?: string;
      value?: string;
      onChange?: false;
    } & TCommonProps);

function FormTextArea<T>({
  id,
  name,
  error,
  label,
  rows = 3,
  placeholder,
  value,
  leading,
  required,
  register,
  onChange,
  className,
  errorClassName,
  labelClassName,
  containerClassName,
}: TProps<T>) {
  const isOnChange = typeof onChange === 'function';

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          >
            <span>{label}</span>
            {required ? <span className="text-red-500">*</span> : ''}
          </label>
        )}
        <div className="relative">
          {leading && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span
                className={classNames(
                  'font-light text-gray-400 transition duration-300 ease-in-out',
                  {
                    'form-input-leading-error': error,
                    'form-input-leading': !error,
                  }
                )}
              >
                {leading}
              </span>
            </div>
          )}
          <textarea
            autoComplete="off"
            id={id ?? name}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
            {...(!register && { required })}
            {...(register && { ...register })}
            className={classNames('form-input', className, {
              'form-input-error': error,
              'pl-8': leading,
            })}
          />
        </div>
      </div>
      {!!error && (
        <small className={classNames('form-error-badge', errorClassName)}>
          {error ?? ''}
        </small>
      )}
    </div>
  );
}

export default FormTextArea;
