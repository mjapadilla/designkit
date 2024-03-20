import dayjs from 'dayjs';

import { $req, useInfiniteQuery } from 'services';

import { TPagination, TParams } from 'types';

import { formatCurrency } from 'utils';

import { transformParams, transformResponse } from '../_transformers';
import { TResponse } from '../_types';

const actions = (params: TParams, signal?: AbortSignal) => {
  // eslint-disable-next-line no-console
  console.log(transformParams(params), signal, ' here');
  return $req.get<{
    data: TResponse[];
    meta: TPagination;
  }>({
    transform: {
      data: Array.from(Array(50))?.map((i) => ({
        uuid: i,
        channel: 'CEBUANA',
        amount: formatCurrency(String(Math.floor(Math.random() * 10000000))),
        date: dayjs().format('YYYY-MM-DD'),
        remakrs: 'DEBIT',
        status: Math.floor(Math.random() * 10) > 5 ? 'SUCCESS' : 'FAILED',
        transaction_id: String(Math.floor(Math.random() * 100000000)),
      })),
      meta: {
        current_page: 1,
        last_page: 1,
        from: 1,
        path: '',
        per_page: 50,
        to: 1,
        total: 50,
      },
    },
  });
};
// req?.get<{
//   data: TResponse[];
//   meta: TPagination;
// }>(
//   {
//     url: `/core_operator/v1/user/${organzation_uuid}`,
//     params: transformParams(params),
//     transform: ({ data, meta }) => ({
//       data: data,
//       meta: meta,
//     }),
//   },
//   { signal }
// );

const useGetAllTransactions = (params: TParams) =>
  useInfiniteQuery({
    queryKey: ['TRANSACTIONS/ALL_TRANSACTIONS', params],
    queryFn: ({ pageParam = 1, signal }) =>
      actions({ ...params, page: pageParam }, signal),
    getNextPageParam: ({ meta }) =>
      meta?.current_page === meta?.last_page
        ? undefined
        : meta?.current_page + 1,
    select: (data) => ({
      pages: [...data.pages].flatMap((page) =>
        page.data.map(transformResponse)
      ),
      pageParams: [...data.pageParams],
    }),
  });

export default useGetAllTransactions;
