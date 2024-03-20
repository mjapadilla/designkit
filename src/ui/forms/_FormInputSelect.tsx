import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React, { type MutableRefObject } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';
import { HiChevronDown } from 'react-icons/hi';
import { ImCheckmark, ImRadioChecked2 } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { RiLoader5Line } from 'react-icons/ri';

import { TOption } from 'types';

import { getUseStateValue, mergeClasses } from 'utils';

type ValueType = string | TOption | TOption[];

type TCommonProps = {
  max?: number;
  error?: string;
  options: TOption[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  optionHeight?: string;
  isSearchable?: boolean;
  withUnselect?: boolean;
  label?: string | boolean;
};

type TProps<T> =
  | ({
      register?: false;
      name: string;
      value: ValueType;
      onChange: React.Dispatch<React.SetStateAction<T>>;
    } & TCommonProps)
  | ({
      register: FieldValues;
      name?: string;
      value?: string;
      onChange?: false;
    } & TCommonProps);

const ifSelected = (i: TOption[] | TOption | string, j: TOption) => {
  if (Array.isArray(i)) {
    return i?.findIndex((x) => String(x?.value) === String(j?.value)) > -1;
  }
  return false;
};

const InputComponent = <T,>({
  name,
  value,
  error,
  options,
  onChange,
  max = 99999,
  label = false,
  disabled = false,
  required = false,
  isLoading = false,
  isMultiple = false,
  isSearchable = false,
  placeholder = 'Select',
  withUnselect = false,
  optionHeight = 'max-h-80',
  className,
}: Omit<TProps<T>, 'register'>) => {
  const clickRef: MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  const [isShow, setIfShow] = React.useState<boolean>(false);
  const [animate, setAnimate] = React.useState<boolean>(false);

  const [menuOption, setMenuOption] = React.useState<TOption[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<TOption[]>([]);

  const [searchValue, setSearchValue] = React.useState('');

  const isArrayValue = Array.isArray(value);
  const isOnChange = typeof onChange === 'function';

  const onShow = React.useCallback(() => {
    if (!isShow) {
      setIfShow(true);
      setTimeout(() => {
        setAnimate(true);
      }, 100);
      return;
    }
    setAnimate(false);
    setTimeout(() => {
      setIfShow(false);
    }, 300);
  }, [isShow]);

  const handleOnSearchMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value ?? '';
    setSearchValue(val);

    if (val) {
      const x = options.filter((item) =>
        item?.label?.toLowerCase().includes(val.toLowerCase())
      );
      setMenuOption(x);
      return;
    }
    setMenuOption(options);
  };

  const onSelect = (item: TOption) => () => {
    if (isMultiple) {
      const isMax = [...selectedOption, item]?.length > max;
      if (isMax) return;

      if (isOnChange) {
        onChange((prev: T) => ({
          ...prev,
          [name as never]: [...selectedOption, item],
        }));
      }
      return;
    }
    if (isOnChange) {
      onChange((prev: T) => ({ ...prev, [name as never]: item }));
    }
    onShow();
  };

  const onUnSelect = React.useCallback(
    (item: TOption) => () => {
      const newOptions = selectedOption.filter(
        (i) => String(i?.value) !== String(item?.value)
      );

      if (isMultiple) {
        setSelectedOption(newOptions);
        if (isOnChange) {
          onChange((prev: T) => ({
            ...prev,
            [name as never]: newOptions?.length > 0 ? newOptions : '',
          }));
          return;
        }
        return;
      }

      if (withUnselect) return;
      setSelectedOption(newOptions);
      if (isOnChange) {
        onChange((prev: T) => ({
          ...prev,
          [name as never]: newOptions[0] || '',
        }));
      }
      onShow();
    },
    [
      isMultiple,
      isOnChange,
      name,
      onChange,
      onShow,
      selectedOption,
      withUnselect,
    ]
  );

  const renderValue = React.useMemo(() => {
    if (typeof value === 'string') {
      return (
        <span
          className={mergeClasses(
            error ? 'form-input-error' : 'form-placeholder'
          )}
        >
          {placeholder}
        </span>
      );
    }

    if (!isArrayValue) {
      return (
        <span className="form-placeholder text-inherit">{value?.label}</span>
      );
    }

    if (isMultiple) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOption?.map((i) => (
            <div key={i?.value} className="inline-block flex-shrink-0">
              <div className="flex items-center rounded-md bg-gray-200  text-sm font-semibold">
                <span className="pl-2 pr-1">{i?.label}</span>
                <a
                  href="#"
                  role="button"
                  id="remove-item"
                  onClick={onUnSelect(i)}
                  className={mergeClasses(
                    'pr-1 outline-none hover:text-primary-500',
                    disabled ? 'pointer-events-none' : '',
                    className
                  )}
                >
                  <IoClose className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <span />;
  }, [
    className,
    disabled,
    error,
    isArrayValue,
    isMultiple,
    onUnSelect,
    placeholder,
    selectedOption,
    value,
  ]);

  React.useMemo(() => {
    if (options?.length > 0) {
      setMenuOption(options);
    }
  }, [options]);

  React.useMemo(() => {
    if (!isEmpty(value)) {
      const x = isMultiple ? value : [value];
      setSelectedOption(x as TOption[]);
    }
  }, [isMultiple, value]);

  React.useMemo(() => {
    const escFunction = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onShow();
      }
    };

    const handleClearToggle = (e: MouseEvent) => {
      try {
        if (clickRef?.current && !clickRef.current.contains(e.target as Node)) {
          onShow();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err, ' here');
      }
    };

    if (isShow) {
      document.addEventListener('keydown', escFunction, false);
      document.addEventListener('mousedown', handleClearToggle, false);
    }
    return () => {
      document.removeEventListener('keydown', escFunction, false);
      document.removeEventListener('mousedown', handleClearToggle, false);
    };
  }, [isShow, onShow]);

  return (
    <div
      ref={clickRef}
      className={classNames('bg-white', {
        'cursor-pointer': !disabled,
        'cursor-not-allowed opacity-70': disabled,
      })}
    >
      <div
        className={classNames('relative w-full', {
          'pointer-events-none': disabled,
        })}
      >
        <div
          className={classNames('form-container group')}
          onClick={onShow}
          role="button"
        >
          {label && (
            <label className={classNames('form-label')} htmlFor={name}>
              <span>{label}</span>
              {required ? <span className="text-red-500">*</span> : ''}
            </label>
          )}
          {/* READONLY */}
          <input type="text" id={name} className="sr-only" />
          <div
            className={mergeClasses(
              'form-input flex h-auto min-h-[2.5rem] py-1 pr-2',
              error ? 'form-input-error' : '',
              className
            )}
          >
            <div className="flex flex-grow items-center justify-center">
              {renderValue}
              <div className="ml-auto flex h-0 items-center">
                {isLoading && !isShow ? (
                  <RiLoader5Line className="h-7 w-7 animate-spin" />
                ) : (
                  <HiChevronDown className="h-7 w-7" />
                )}
              </div>
            </div>
          </div>
        </div>
        {isShow && (
          <div
            className={classNames(
              'mb-10 flex h-auto flex-col',
              'transition duration-100 ease-out',
              'bg-white rounded-md border border-gray-100 shadow',
              'absolute right-0 z-50 mt-1 w-full origin-top transform overflow-hidden',
              optionHeight,
              {
                'scale-95 opacity-0': !animate,
                'scale-100 opacity-100': animate,
              }
            )}
          >
            <div className="flex flex-col overflow-hidden">
              {isSearchable && (
                <div className="px-3 py-2">
                  <label
                    htmlFor={`search-${name}`}
                    className="text-xs font-semibold text-gray-500"
                  >
                    Search Option
                  </label>
                  <div className="w-full overflow-hidden rounded-md border border-gray-300 text-gray-400 transition duration-300 ease-in-out focus-within:border-gray-600 focus-within:text-gray-600">
                    <div className="flex">
                      <div className="flex w-10 px-2">
                        <GoSearch className="m-auto h-5 w-5 flex-shrink-0" />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        id={`search-${name}`}
                        value={searchValue}
                        onChange={handleOnSearchMenu}
                        placeholder="Search..."
                        className="w-full flex-grow py-2 pl-0 pr-2 text-gray-600 placeholder-gray-400 outline-none sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="overflow-auto">
                {menuOption.length > 0 ? (
                  <div className="divide-y">
                    {menuOption?.map((i) => {
                      const isSelected = ifSelected(selectedOption, i);
                      return (
                        <div
                          key={i?.value}
                          role="button"
                          onClick={!isSelected ? onSelect(i) : onUnSelect(i)}
                          className="flex cursor-pointer items-center space-x-2 p-3 text-zinc-800 hover:bg-slate-50/80"
                        >
                          <div
                            className={classNames(
                              'border border-slate-700 p-px',
                              {
                                'text-slate-700': isSelected,
                                'bg-white': !isSelected,
                              },
                              {
                                rounded: isMultiple,
                                'rounded-full': !isMultiple,
                              }
                            )}
                          >
                            {isMultiple ? (
                              <ImCheckmark
                                className={classNames('h-4 w-4', {
                                  visible: isSelected,
                                  invisible: !isSelected,
                                })}
                              />
                            ) : (
                              <ImRadioChecked2
                                className={classNames('h-4 w-4', {
                                  visible: isSelected,
                                  invisible: !isSelected,
                                })}
                              />
                            )}
                          </div>
                          <span className="text-base">{i?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={classNames('flex w-full justify-center ', {
                      'px-3 py-2 pb-4': isSearchable,
                      'p-3': !isSearchable,
                    })}
                  >
                    <span className="text-normal flex items-center font-medium text-gray-400">
                      No options found...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {error && <small className=" form-error-badge">{error ?? ''}</small>}
      </div>
    </div>
  );
};

/**
 * # Allowed props
 * @param name  - (String) The name of the input
 * @param label - (String) The label title for input
 * @param options - (Array) Options shows as dropdown
 * #### Option array format
 * ```ts
 * options=[
 *  {
 *    "label": "OPTION",
 *    "value": "OPTION"
 *  }
 * ]
 * ```
 * @param max - (Number) The max allowed selection of options
 * @param isLoading - (Boolean) Determine if the component is loading
 * @param value - (Array of Object) The current value of the component
 * @param withUnselect - (Boolean) Cancel unselect on non multiple option
 * @param optionHeight - (String) Max heigth of the dropdown. Used tailwind
 * @param placeholder - (String) Placeholder text if no present value is available
 * @param isSearchable - (Boolean) Adding search function for the option list
 */

function FormInputSelect<T>({ register, ...rest }: TProps<T>) {
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

export default FormInputSelect;
