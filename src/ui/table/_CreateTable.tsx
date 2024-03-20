import classNames from 'classnames';
import React from 'react';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';

import { EmptyState, PageLoader, SkeletonLoader } from 'ui/components';

import { mergeClasses } from 'utils';

import {
  type IColumn,
  type ITable,
  type TLabel,
  type TSortBy,
  type TValue,
} from './_types';

const createColumn = <T,>(_props: IColumn<T>) => <>{_props?.label}</>;

const getLabel = <T,>(label: TLabel<T>, item: T): React.ReactNode => {
  try {
    if (typeof label === 'function') {
      return label(item);
    }
    if (typeof label === 'string') {
      return label;
    }
  } catch (error) {
    return '--';
  }
  return label;
};

const getCell = <T,>(
  item: T,
  value: TValue<T> | 'index',
  index: number
): React.ReactNode => {
  try {
    if (value === 'index') {
      return index + 1;
    }

    if (typeof value === 'function') {
      return value(item, index);
    }
    if (typeof value === 'string') {
      const $value = (item as never)?.[value];
      return $value;
    }
  } catch (err) {
    return '--';
  }
  return '--';
};

export const createTable = <T,>() => {
  const Table = ({
    data = [],
    children,
    selectedKey,
    onSortByChange,
    onCheckBoxChange,
    selected = '',
    defaultSortBy = 'desc',
    withHover = false,
    hideHeader = false,
    isLoading = false,
    isFetching = false,
    isInfiniteTable,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    onSelectRow,
    tClassName,
    trClassName,
    tbodyClassName,
    theadClassName,
    containerClassName,
    outerClassName,
    id = 'generic-table',
  }: ITable<T>) => {
    const { ref, inView } = useInView();

    const [rows, setRows] = React.useState<T[]>([]);
    const [sortBy, setSortBy] = React.useState<TSortBy>(defaultSortBy);
    const [checkBoxes, setCheckBoxes] = React.useState<string[]>([]);
    const rowsId = rows?.map(
      (item) => (item as never)?.[selectedKey ?? 'uuid']
    );

    const childArray = React.Children.toArray(children);

    const handleOnHeader = (key: keyof T, sort_by: TSortBy) => () => {
      if (onSortByChange) {
        onSortByChange({ key, sort_by });
        setSortBy(sort_by);
      }
    };

    const handleSelectRow = (value: T) => {
      const modal = document.getElementById('modal-child');
      const drawer = document.getElementById('drawer-child');
      if (onSelectRow) {
        if (!modal && !drawer) {
          onSelectRow(value);
        }
      }
    };

    const handleOnCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.checked;
      const x = v ? rowsId : [];
      setCheckBoxes(x);
      if (onCheckBoxChange) onCheckBoxChange(x as never);
    };

    const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>, row: T) => {
      const v = e.target.checked;
      const key = (row as never)?.[selectedKey ?? 'uuid'];
      const x: string[] = v
        ? [...checkBoxes, key]
        : checkBoxes?.filter((item) => item !== key);
      setCheckBoxes(x);
      if (onCheckBoxChange) onCheckBoxChange(x as never);
    };

    const isCheckedAll = React.useMemo(
      () =>
        checkBoxes?.length <= 0
          ? false
          : rowsId?.every((item) => checkBoxes?.includes(item)),
      [rowsId, checkBoxes]
    );

    React.useEffect(() => {
      if (!isLoading) {
        setRows(data);
      }
    }, [data, isLoading]);

    React.useMemo(() => {
      if (inView && fetchNextPage) {
        fetchNextPage();
      }
    }, [fetchNextPage, inView]);

    return (
      <div
        className={mergeClasses(
          'relative h-full w-full overflow-hidden rounded md:min-h-0',
          outerClassName
        )}
      >
        <SkeletonLoader
          isLoading={rows?.length === 0 && isLoading}
          className="h-full w-full"
        >
          {isInfiniteTable
            ? isFetching &&
              !isFetchingNextPage && (
                <div className="bg-white/40 absolute inset-0 z-20 flex h-full w-full overflow-hidden rounded border">
                  <div className="bg-white m-auto rounded border border-gray-50 px-3 py-1 shadow-sm">
                    <PageLoader label="Please wait..." />
                  </div>
                </div>
              )
            : isFetching && (
                <div className="bg-white/40 absolute inset-0 z-20 flex h-full w-full overflow-hidden rounded border">
                  <div className="bg-white m-auto rounded border border-gray-50 px-3 py-1 shadow-sm">
                    <PageLoader label="Please wait..." />
                  </div>
                </div>
              )}
          {rows?.length === 0 && !isLoading && !isFetching && (
            <div className="absolute inset-0 z-20 flex h-full w-full overflow-hidden rounded border">
              <div className="bg-white/40 m-auto h-full w-full">
                <EmptyState />
              </div>
            </div>
          )}
          <div
            id="gt-table-container"
            className={classNames('gt-table-container', containerClassName)}
          >
            <div id={id} className="gt-table-inner-container">
              <table
                className={classNames('gt-table', tClassName, {
                  'h-full': rows?.length < 1,
                })}
              >
                {!hideHeader && (
                  <thead
                    className={classNames('gt-table-head', theadClassName, {
                      'z-20': rows?.length < 1,
                    })}
                  >
                    <tr>
                      {onCheckBoxChange && (
                        <th className="w-10">
                          <input
                            type="checkbox"
                            name="check_all"
                            checked={isCheckedAll}
                            onChange={handleOnCheckAll}
                            className="h-4 w-4 cursor-pointer rounded text-primary-500 focus:ring-primary-500"
                          />
                        </th>
                      )}
                      {React.Children.toArray(
                        React.Children?.map(children, (child, k) => {
                          const { label, withSort, labelClassName, className } =
                            child.props;
                          const item = (rows as never)[k];
                          const iconClassName =
                            'h-[15px] w-[15px] text-primary-500';
                          return (
                            <th className={className}>
                              {withSort ? (
                                <div
                                  className={classNames(
                                    'h-full',
                                    labelClassName
                                  )}
                                >
                                  <div
                                    role="presentation"
                                    onClick={handleOnHeader(
                                      withSort,
                                      sortBy === 'asc' ? 'desc' : 'asc'
                                    )}
                                    className="flex cursor-pointer items-center gap-2"
                                  >
                                    {getLabel<T>(label, item)}
                                    {sortBy === 'asc' ? (
                                      <HiSortAscending
                                        className={iconClassName}
                                      />
                                    ) : (
                                      <HiSortDescending
                                        className={iconClassName}
                                      />
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={classNames(
                                    'h-full',
                                    labelClassName
                                  )}
                                >
                                  {getLabel<T>(label, item)}
                                </div>
                              )}
                            </th>
                          );
                        })
                      )}
                    </tr>
                  </thead>
                )}
                <tbody
                  id="generic-table"
                  className={classNames('gt-table-body', tbodyClassName)}
                >
                  {rows?.length < 1 ? (
                    <tr>
                      <td />
                    </tr>
                  ) : (
                    rows?.map((item, index) => {
                      const $key = (item as never)?.[selectedKey ?? 'uuid'];
                      const isSelected = String(selected) === String($key);
                      return (
                        <tr
                          key={$key}
                          id={$key}
                          className={classNames('gt-table-row', trClassName, {
                            'gt-table-row-selected': isSelected,
                            'gt-table-row-hover': withHover && !isSelected,
                          })}
                          onClick={() => handleSelectRow(item)}
                        >
                          {onCheckBoxChange && (
                            <td className="w-10">
                              <input
                                name="check"
                                type="checkbox"
                                checked={checkBoxes?.includes(
                                  (item as never)?.[selectedKey ?? 'uuid']
                                )}
                                onChange={(e) => handleOnCheck(e, item)}
                                className="h-4 w-4 cursor-pointer rounded text-primary-500 focus:ring-primary-500"
                              />
                            </td>
                          )}
                          {React.Children.toArray(
                            React.Children?.map(children, (child) => {
                              const { value, className } = child.props;
                              return (
                                <td
                                  className={classNames(
                                    'font-medium',
                                    className
                                  )}
                                >
                                  {getCell<T>(item, value, index)}
                                </td>
                              );
                            })
                          )}
                        </tr>
                      );
                    })
                  )}
                  {rows?.length > 0 && isInfiniteTable && hasNextPage && (
                    <tr>
                      <td
                        colSpan={childArray?.length}
                        className="w-full bg-slate-100 px-6 py-1"
                      >
                        <button
                          ref={ref}
                          onClick={() => fetchNextPage()}
                          className="w-full text-center text-sm font-semibold"
                          disabled={!hasNextPage || isFetchingNextPage}
                        >
                          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </SkeletonLoader>
      </div>
    );
  };
  const Column = createColumn<T>;

  return { Table, Column };
};
