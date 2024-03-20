import classNames from 'classnames';
import React from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

type TCommonProps = {
  id?: string;
  error?: string;
  type?: string;
  className?: string;
  required?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  labelClassName?: string;
  errorClassName?: string;
  leading?: React.ReactNode;
  withShowPassword?: boolean;
  iconAlignClassName?: string;
  containerClassName?: string;
  withCountrySearch?: boolean;
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

const InputComponent = <T,>({
  id,
  name,
  error,
  value,
  className,
  withCountrySearch = false,
  handleOnChange,
}: Omit<TProps<T>, 'onChange'> & { handleOnChange: (res: string) => void }) => (
  <PhoneInput
    jumpCursorToEnd
    disableCountryGuess
    enableSearch
    country="ph"
    value={value}
    placeholder="+63 (9XX) XXX XXXX"
    onlyCountries={['ph']}
    masks={{ ph: '(...) ... ....' }}
    searchPlaceholder="Search country..."
    onChange={handleOnChange}
    disableDropdown={!withCountrySearch}
    inputProps={{
      id: id ?? name,
      name: name,
      autoComplete: 'none',
      type: 'tel',
      className: classNames(
        'form-input',
        className,
        {
          'form-input-error': error,
        },
        {
          'pl-14': withCountrySearch,
          'pl-10': !withCountrySearch,
        }
      ),
    }}
  />
);

function FormInputMobileNumber<T>({
  id,
  name,
  label,
  required,
  register,
  onChange,
  errorClassName,
  labelClassName,
  containerClassName,
  ...rest
}: TProps<T>) {
  const isOnChange = typeof onChange === 'function';

  const handleOnChange = (v: string) => {
    if (isOnChange && Boolean(!register)) {
      onChange((prev: T) => ({
        ...prev,
        [name as never]: v,
      }));
      return;
    }
  };

  const { control } = useFormContext();

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
          {!register ? (
            <InputComponent {...rest} handleOnChange={handleOnChange} />
          ) : (
            <Controller
              control={control}
              name={register?.name}
              render={({ field: { onChange, value, name } }) => (
                <InputComponent
                  {...rest}
                  name={name}
                  value={value}
                  handleOnChange={onChange}
                />
              )}
            />
          )}
          {rest?.error && (
            <small className={classNames('form-error-badge', errorClassName)}>
              {rest?.error ?? ''}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormInputMobileNumber;
