export type TTransformedObject<T> = {
  label: string;
  value: string;
  data: T | null;
};

export const optionFormatter = <T>(
  list: T[],
  value: keyof T,
  label: keyof T,
  options?: {
    withData?: boolean;
    isLabelUpperCase?: boolean;
  }
): TTransformedObject<T>[] => {
  const { isLabelUpperCase = true, withData } = options ?? {};
  const newList = list?.map((i) => ({
    label: String(
      isLabelUpperCase ? (i[label] as string).toUpperCase() : i[label]
    ),
    value: String(i[value]),
    data: withData ? i : null,
  }));
  return newList;
};
