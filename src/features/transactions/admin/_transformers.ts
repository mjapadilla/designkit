import dayjs from 'dayjs';
import { isObject, omit } from 'lodash';

import { TParams } from 'types';

import { removeEmpty } from 'utils';

import { TResponse } from './_types';

export const transformParams = (item: TParams) => {
  const x = {
    ...omit(item, ['pageParam']),
    order_by: isObject(item?.order_by) ? item?.order_by?.value : '',
    sort_by: isObject(item?.sort_by) ? item?.sort_by?.value : '',
  };
  return removeEmpty(x);
};

export const transformResponse = (item: TResponse) => {
  const x = {
    ...item,
    human_date: dayjs(item?.date).format('MMM DD, YYYY'),
  };
  return x;
};
