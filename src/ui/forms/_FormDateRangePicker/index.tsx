import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { MutableRefObject } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiCalendar, HiChevronDown } from 'react-icons/hi';

import { DATE_RANGE_OPTS } from './_constants';
import CustomHeader from './_CustomerHeader';
import { DAY_ABBREVIATION_MAP, type TValue } from './_types';

interface IProps<T> {
  id?: string;
  name: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  isMobile?: boolean;
  hasNoToday?: boolean;
  placeholder?: string;
  value?: TValue;
  labelClassName?: string;
  label?: string | boolean;
  containerClassName?: string;
  onChange?: React.Dispatch<React.SetStateAction<T>>;
}

function FormDateRangePicker<T>({
  id,
  name,
  error,
  label,
  onChange,
  className,
  labelClassName,
  disabled = false,
  required = false,
  isMobile = false,
  hasNoToday = false,
  containerClassName,
  value = {
    label: 'Custom',
    value: '',
    data: {
      from: '',
      to: '',
    },
  },
  placeholder = 'Select date range',
}: IProps<T>) {
  const isOnChange = typeof onChange === 'function';

  const clickRef: MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  const [date, setDate] = React.useState<TValue>(value);

  const { data } = date ?? {};

  const [isShow, setIfShow] = React.useState<boolean>(false);
  const [animate, setAnimate] = React.useState<boolean>(false);

  const dateRangeOpts = React.useMemo(() => {
    const formatedDateRage = hasNoToday
      ? DATE_RANGE_OPTS?.filter((i) => i?.value !== 'today')
      : DATE_RANGE_OPTS;

    return formatedDateRage;
  }, [hasNoToday]);

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

  const onSelectOption = (v: TValue) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(v);
  };

  const onChangeDate = ([start, end]: [Date | null, Date | null]) => {
    setDate({
      label: 'Custom',
      value: '',
      data: {
        from: start ? dayjs(start) : '',
        to: end ? dayjs(end) : '',
      },
    });
  };

  const onClear = (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(dateRangeOpts[0]);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOnChange) {
      onChange((prev) => ({
        ...prev,
        [name]: {
          ...date,
          data: {
            from: data?.from ? dayjs(data?.from).format('YYYY-MM-DD') : '',
            to: data?.to ? dayjs(data?.to).format('YYYY-MM-DD') : '',
          },
        },
      }));
      onShow();
    }
  };

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(value);
    onShow();
  };

  const renderValue = React.useMemo(() => {
    const { from, to } = data ?? {};
    if (from && to) {
      const format = 'MMM DD, YYYY';
      const f = dayjs(from).format(format);
      const t = dayjs(to).format(format);

      const renderDate = f === t ? f : `${f} - ${t}`;
      return renderDate;
    }
    return placeholder;
  }, [data, placeholder]);

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
    <div ref={clickRef} className="relative w-full">
      <div
        className={classNames('group', containerClassName, {
          'form-container': !error,
          'form-container-error': error,
        })}
      >
        {label && (
          <label
            className={classNames('form-label', labelClassName)}
            htmlFor={id ?? name}
          >
            <span>{label}</span>
            {required ? <span className="text-red-500">(Required)</span> : ''}
          </label>
        )}
        <button
          type="button"
          id={id ?? name}
          onClick={onShow}
          disabled={disabled}
          className={classNames('flex items-center pr-2', className, {
            'form-input': !error,
            'form-input-error': error,
          })}
        >
          <div
            className={classNames('form-placeholder w-full', {
              'text-inherit': data?.from && data?.to,
            })}
          >
            <div className="flex items-center space-x-1">
              <HiCalendar className="h-5 w-5" />
              <span>{renderValue}</span>
            </div>
          </div>
          <div className="ml-auto">
            <HiChevronDown className="h-7 w-7" />
          </div>
        </button>
      </div>
      {isShow && (
        <div
          className={classNames(
            'divide-y',
            'mb-10 flex h-auto flex-col',
            'transition duration-100 ease-out',
            'bg-white rounded-md border border-gray-100 shadow',
            'absolute right-0 z-50 mt-1 origin-center transform overflow-hidden object-top',
            {
              'scale-95 opacity-0': !animate,
              'scale-100 opacity-100': animate,
            },
            {
              'w-full md:w-[741px]': !isMobile,
              'w-full': isMobile,
            }
          )}
        >
          <div
            className={classNames('flex', {
              'flex-col': isMobile,
              'flex-col md:flex-row md:divide-x': !isMobile,
            })}
          >
            <div
              className={classNames('space-y-3  md:flex-shrink-0 ', {
                'w-full px-5 pt-5': isMobile,
                'w-full px-5 pt-5 md:w-36 md:p-5': !isMobile,
              })}
            >
              <div className="text-sm font-semibold">Time Presets</div>
              <div
                className={classNames('-ml-1 flex-wrap', {
                  'flex flex-row md:flex-col md:space-y-1': !isMobile,
                })}
              >
                {dateRangeOpts?.map((item, key) => (
                  <button
                    key={key}
                    type="button"
                    className="px-1 py-px text-left"
                    onClick={onSelectOption(item)}
                  >
                    <div
                      className={classNames(
                        'text-left text-sm text-slate-500',
                        {
                          'font-semibold text-slate-800':
                            item?.value === date?.value,
                        }
                      )}
                    >
                      {item?.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex w-full p-5">
              <div className="m-auto">
                <DatePicker
                  inline
                  name={name}
                  selectsRange
                  monthsShown={isMobile ? 1 : 2}
                  id={id ?? name}
                  onChange={onChangeDate}
                  disabledKeyboardNavigation
                  focusSelectedMonth={false}
                  shouldCloseOnSelect={false}
                  calendarClassName="customize-datepicker-theme"
                  formatWeekDay={(nameOfDay) => DAY_ABBREVIATION_MAP[nameOfDay]}
                  selected={data?.to ? dayjs(data?.to).toDate() : undefined}
                  endDate={data?.to ? dayjs(data?.to).toDate() : undefined}
                  startDate={
                    data?.from ? dayjs(data?.from).toDate() : undefined
                  }
                  renderCustomHeader={(props) => (
                    <CustomHeader monthsShown={isMobile ? 1 : 2} {...props} />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="px-5 py-2">
            <div className="flex">
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  className="rounded px-3 py-1.5 text-sm font-medium"
                  onClick={onClear}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="w-20 rounded border px-3 py-1.5 text-sm font-medium"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="text-white w-20 rounded border bg-primary-500 px-3 py-1.5 text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormDateRangePicker;
