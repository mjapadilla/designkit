export const getUseStateValue = <
  T extends { [key: string]: string | object | unknown },
>(
  form: T,
  v: React.SetStateAction<T>
): T => {
  if (typeof v !== 'function') {
    // eslint-disable-next-line
    console.warn('Second parameter is not type of SetStateAction');
    return v;
  }
  const x = v(form);

  return x;
};
