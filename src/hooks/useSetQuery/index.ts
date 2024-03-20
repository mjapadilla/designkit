import { pick } from 'lodash';
import qs from 'qs';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { removeEmpty } from 'utils';

interface IProps {
  page?: number | string;
  per_page?: number | string;
}

let timer: NodeJS.Timeout;

const useSetQuery = <T>(
  INIT_STATE: T,
  prefix = 'query'
): [T, (value: T & IProps, cb?: (res: string) => void) => void] => {
  const { state } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const x = qs.parse(searchParams?.get(prefix) ?? '');
  const [filter, setFilter] = React.useState<T & IProps>({
    ...INIT_STATE,
    ...pick(x, Object.keys(INIT_STATE as T & IProps)),
  });

  const setQuery = React.useCallback(
    (value: T & IProps, cb?: (res: string) => void) => {
      setFilter(value);
      searchParams.set(prefix, qs.stringify(removeEmpty(value)));
      searchParams.sort();
      setTimeout(() => {
        setSearchParams(searchParams, { state });
        if (cb) cb(searchParams.toString());
      }, 10);
    },
    [prefix, searchParams, setSearchParams, state]
  );

  React.useEffect(() => {
    if (!searchParams.has(prefix)) {
      searchParams.set(prefix, qs.stringify(removeEmpty(INIT_STATE || {})));
      timer = setTimeout(() => {
        setSearchParams(searchParams, { state });
      }, 10);
    }
    return () => {
      clearTimeout(timer);
      searchParams.delete(prefix);
    };
  }, [INIT_STATE, prefix, searchParams, setSearchParams, state]);

  const query = removeEmpty({
    ...filter,
    page: filter?.page ?? '',
    per_page: filter?.per_page ?? '',
  }) as T & IProps;

  return [query, setQuery];
};

export default useSetQuery;
