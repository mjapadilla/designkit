import { jsUcFirst } from 'utils';

import { TResponse } from './_types';

export const transformResponse = (item: TResponse) => {
  const { first_name, last_name } = item?.profile || {};
  const full_name =
    first_name && last_name ? jsUcFirst(`${first_name} ${last_name}`) : '';
  const role_name = item?.role?.name ? jsUcFirst(item?.role?.name) : '';

  const x = {
    ...item,
    human_role_name: role_name,
    human_full_name: full_name,
  };

  return x;
};
