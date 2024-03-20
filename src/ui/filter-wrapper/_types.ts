export interface IFilterWrapperProps<T> {
  form: T;
  defaultValue: T;
  className?: string;
  isLoading?: boolean;
  placeholder?: string;
  withSearch?: boolean;
  withActiveFilter?: boolean;
  withSearchLabel?: boolean;
  children?: ({
    state,
    onChange,
  }: {
    state: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
  }) => React.ReactNode;
  onSubmit: (res: T) => void;
  actionElement?: React.ReactNode;
}

export interface IActiveFilterProps<T> {
  data: T;
  handleOnReset: () => void;
  onChange: (res: T) => void;
}

export type TDateValue = {
  label: string;
  value: string;
  data: {
    from: string;
    to: string;
  };
};
