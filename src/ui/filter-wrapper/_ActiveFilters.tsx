import dayjs from 'dayjs';
import { isEmpty, omit } from 'lodash';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { TParams } from 'types';

import { IActiveFilterProps } from './_types';

const capitalizeFirstLetter = (input: string): string =>
  input
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const renderValue = (
  item:
    | {
        label: string;
        value: string;
      }
    | string,
  key: string
) => {
  if (typeof item === 'string') return item;
  if (key === 'date') return item?.value;
  return capitalizeFirstLetter(item?.label?.toLocaleLowerCase());
};

function _ActiveFilters<T extends TParams>({
  data,
  onChange,
  handleOnReset,
}: IActiveFilterProps<T>) {
  const x = React.useMemo(() => {
    if (
      'date' in data &&
      data?.date?.data?.from !== '' &&
      data?.date?.data?.to !== ''
    ) {
      const from = dayjs(data?.date?.data?.from).format('ll');
      const to = dayjs(data?.date?.data?.to).format('ll');
      return {
        ...omit(data, ['page', 'per_page']),
        date: {
          label: data?.date?.label,
          value: from === to ? from : `${from} to ${to}`,
        },
      };
    }
    return omit(data, ['date', 'page', 'per_page']);
  }, [data]);

  const values = Object.keys(x)?.map((i) => ({
    key: i,
    label: capitalizeFirstLetter(i?.replaceAll('_', ' ')),
    value: (x as never)[i],
  }));

  const onRemove = (key: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    delete (data as never)?.[key];
    onChange(data as T);
  };

  const onResetFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    handleOnReset();
  };

  return (
    <div className="bg-white flex min-h-[54px] w-full items-center rounded border px-3 py-3">
      {!isEmpty(values) ? (
        <div className="flex w-full items-center">
          <h4 className="flex-shrink-0 text-sm text-slate-500">
            Active Filters:
          </h4>
          <div className="ml-2 flex flex-wrap items-center gap-2">
            {values?.map((i) => (
              <div
                className="flex items-center space-x-1 rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
                key={i?.key}
              >
                <h4>
                  {i?.label} : {renderValue(i?.value, i?.key)}
                </h4>
                {i?.key !== 'sort_by' && i?.key !== 'order_by' && (
                  <button
                    type="button"
                    className="flex h-4 w-4 items-center"
                    onClick={onRemove(i?.key)}
                  >
                    <IoCloseSharp className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="ml-auto text-sm font-medium text-slate-500 hover:underline"
            onClick={onResetFilter}
          >
            <span className="hidden md:block">Reset Filter</span>
            <span className="block md:hidden">Reset</span>
          </button>
        </div>
      ) : (
        <h4 className="text-sm text-slate-500">No filter added</h4>
      )}
    </div>
  );
}

const ActiveFilters = React.memo(_ActiveFilters);

ActiveFilters.displayName = 'ActiveFilters';

export default ActiveFilters;
