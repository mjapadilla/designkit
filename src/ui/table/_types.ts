export type TLabel<T> =
  | string
  | React.ReactNode
  | ((res: T) => React.ReactNode);
export type TValue<T> = keyof T | ((res: T, index?: number) => React.ReactNode);
export type TSortBy = 'asc' | 'desc';

export type IColumn<T> = {
  value: TValue<T> | 'index';
  withSort?: keyof T;
  label?: TLabel<T>;
  className?: string;
  labelClassName?: string;
};

type CommonProps<T> = {
  data: T[];
  id?: string;
  selected?: string;
  children:
    | React.ReactElement<IColumn<T>>
    | Array<React.ReactElement<IColumn<T>>>;
  isLoading?: boolean;
  tClassName?: string;
  selectedKey?: keyof T;
  hideHeader?: boolean;
  withHover?: boolean;
  isFetching?: boolean;
  trClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  containerClassName?: string;
  outerClassName?: string;
  onSelectRow?: (res: T) => void;
  onCheckBoxChange?: (res: string[]) => void;
  defaultSortBy?: TSortBy;
  onSortByChange?: (value: { key: keyof T; sort_by: TSortBy }) => void;
};

export type ITable<T> =
  | ({
      hasNextPage?: false;
      isInfiniteTable?: false;
      isFetchingNextPage?: false;
      fetchNextPage?: false;
    } & CommonProps<T>)
  | ({
      isInfiniteTable: true;
      hasNextPage?: boolean;
      isFetchingNextPage?: boolean;
      fetchNextPage: () => void;
    } & CommonProps<T>);

export type TSorter = {
  key: string;
  sort_by: string;
};
