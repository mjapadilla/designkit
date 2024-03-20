import classNames from 'classnames';
import { debounce } from 'lodash';
import React from 'react';
import { BiSliderAlt } from 'react-icons/bi';

import { TParams } from 'types';

import { Button, SkeletonLoader } from 'ui/components';
import { FormInputSearch } from 'ui/forms';

import { getUseStateValue, removeEmpty } from 'utils';

import ActiveFilters from './_ActiveFilters';
import { IFilterWrapperProps } from './_types';

function _FilterWrapper<T extends TParams>({
  form,
  children,
  onSubmit,
  className,
  defaultValue,
  actionElement,
  isLoading = false,
  withSearch = true,
  withSearchLabel = false,
  withActiveFilter = false,
  placeholder = 'Search...',
}: IFilterWrapperProps<T>) {
  const [filter, setFilter] = React.useState(form);
  const [show, setShow] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  const debouncedSubmit = React.useMemo(
    () => debounce(onSubmit, 500),
    [onSubmit]
  );

  const onShow = React.useCallback(
    (e: React.MouseEvent | KeyboardEvent | React.FormEvent) => {
      if (e) e.preventDefault();
      if (!show) {
        document.body.className = 'overflow-hidden';

        setShow(true);
        setTimeout(() => {
          setAnimate(true);
        }, 300);
        return;
      }
      document.body.removeAttribute('class');
      setAnimate(false);
      setTimeout(() => {
        setShow(false);
      }, 300);
    },
    [show]
  );

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(filter);
    onShow(e);
  };

  const handleOnReset = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      onShow(e);
    }
    onSubmit(defaultValue);
  };

  const onChangeSearch = ($v: React.SetStateAction<typeof filter>) => {
    const v = getUseStateValue(filter, $v);
    setFilter((prev) => ({
      ...prev,
      ...v,
    }));
    debouncedSubmit({
      ...filter,
      ...v,
    });
  };

  const onChangeActiveFilter = (value: T) => {
    setFilter(value);
    onSubmit(value);
  };

  React.useEffect(() => {
    setFilter(form);
  }, [form]);

  React.useMemo(() => {
    const escFunction = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onShow(e);
      }
    };

    if (show) {
      document.addEventListener('keydown', escFunction, false);
    }
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [onShow, show]);

  return (
    <div className="space-y-3">
      <div className="flex flex-row items-center gap-3">
        <div className="flex w-full max-w-md items-center space-x-2">
          {withSearch && (
            <SkeletonLoader
              isLoading={isLoading}
              className={classNames('w-full md:w-72', className)}
            >
              <FormInputSearch
                name="keyword"
                withClearButton
                value={filter?.keyword ?? ''}
                placeholder={placeholder}
                onChange={onChangeSearch}
              />
            </SkeletonLoader>
          )}
          {children && (
            <SkeletonLoader isLoading={isLoading}>
              <Button
                onClick={onShow}
                className="btn medium bg-primary-500 text-sm"
                title="Advance Filters"
                label={
                  <div className="flex md:gap-2">
                    <BiSliderAlt className="h-5 w-5" />
                    {!withSearchLabel && (
                      <span className="hidden md:block">Advance</span>
                    )}
                  </div>
                }
              />
            </SkeletonLoader>
          )}
        </div>
        {actionElement && (
          <div className="ml-auto flex-shrink-0">{actionElement}</div>
        )}
      </div>
      {withActiveFilter && (
        <SkeletonLoader isLoading={isLoading}>
          <ActiveFilters
            data={removeEmpty(form) as T}
            handleOnReset={() => handleOnReset()}
            onChange={onChangeActiveFilter as () => T}
          />
        </SkeletonLoader>
      )}
      {show && children && (
        <form
          onSubmit={handleOnSubmit}
          className="fixed inset-0 z-40 h-full w-full overflow-hidden"
        >
          <div className="fixed inset-0 overflow-hidden">
            <div
              role="presentation"
              onClick={onShow}
              className={classNames(
                'bg-black fixed inset-0 bg-opacity-30',
                'transform-gpu transition-opacity ease-in-out',
                {
                  'opacity-100 duration-300': animate,
                  'opacity-0 duration-200': !animate,
                }
              )}
            />
            <div className="fixed inset-y-0 right-0 flex max-w-full">
              <div
                className={classNames(
                  'relative w-screen max-w-sm transition duration-200 ease-in-out',
                  {
                    'translate-x-0': animate,
                    'translate-x-full': !animate,
                  }
                )}
              >
                <div className="bg-white flex h-full w-full flex-col p-5">
                  <div className="flex items-center">
                    <p className="text-xl font-bold">Advanced Search</p>
                    <div className="ml-auto">
                      <button
                        type="button"
                        tabIndex={-1}
                        className="group rounded-full p-1 outline-none transition duration-300 ease-in-out hover:bg-primary-500"
                        onClick={onShow}
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="group-hover:text-white h-6 w-6 rounded-full text-primary-500 transition duration-300 ease-in-out"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="pointer-events-auto flex flex-1 flex-col overflow-auto">
                    <div className="mt-2 flex-1 space-y-3">
                      {typeof children === 'function' &&
                        children({
                          state: filter,
                          onChange: setFilter,
                        })}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        color="brand"
                        className="w-full"
                        label="Reset"
                        onClick={handleOnReset}
                      />
                      <Button
                        type="submit"
                        label="Apply Filter"
                        color="brand"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

const FilterWrapper = React.memo(_FilterWrapper);

FilterWrapper.displayName = 'FilterWrapper';

export default FilterWrapper;
