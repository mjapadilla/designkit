import classNames from 'classnames';
import React, { type ReactNode } from 'react';
import { ImCross } from 'react-icons/im';
import { IoSearch } from 'react-icons/io5';

interface IProps<T> {
  id?: string;
  name: string;
  value: string;
  label?: ReactNode;
  className?: string;
  placeholder?: string;
  labelClassName?: string;
  withClearButton?: boolean;
  containerClassName?: string;
  onChange?: React.Dispatch<React.SetStateAction<T>>;
}

function FormInputSearch<T>({
  id,
  name,
  label,
  value,
  onChange,
  className,
  placeholder,
  labelClassName,
  withClearButton,
  containerClassName,
}: IProps<T>) {
  const isOnChange = typeof onChange === 'function';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOnChange) {
      onChange((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleOnClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOnChange) {
      onChange((prev) => ({ ...prev, [name]: '' }));
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
            {label}
          </label>
        )}
        <div className="relative">
          <div
            className={classNames(
              'form-placeholder absolute inset-y-0 left-0 flex items-center pl-3',
              {
                'text-inherit': value,
              }
            )}
          >
            <IoSearch className="h-5 w-5" />
          </div>
          <input
            type="text"
            name={name}
            value={value}
            id={id ?? name}
            placeholder={placeholder}
            onChange={handleOnChange}
            className={classNames('form-input pl-9 pr-4', className)}
          />
          {value && withClearButton && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                id={name}
                type="button"
                className="h-full"
                title="Clear"
                onClick={handleOnClear}
              >
                <ImCross className="h-3 w-3 text-gray-500 hover:text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormInputSearch;
