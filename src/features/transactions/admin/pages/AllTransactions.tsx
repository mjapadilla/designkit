import React from 'react';

import useSetQuery from 'hooks/useSetQuery';

import PageLayout from 'layouts/page-layout';

import { Badge } from 'ui/components';
import createTable from 'ui/table';

import { INIT_FILTER } from '../_constants';
import { TExtendedResponse, TResponse } from '../_types';
import Filter from '../components/Filter';
import useGetAllTransactions from '../hooks/useGetAllTransactions';

const { Table, Column } = createTable<TResponse & TExtendedResponse>();

function AllTransactions() {
  const [query, setQuery] = useSetQuery(INIT_FILTER, 'all-transactions');

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllTransactions(query);

  const onSubmit = (value: typeof INIT_FILTER) => {
    setQuery(value);
  };

  const useRenderColumn = (type: 'status') =>
    React.useCallback(
      (item: TResponse) => {
        const dispatchRender = {
          status: item?.status ? (
            <div className="flex items-center">
              <Badge
                className="w-16"
                label={item?.status}
                color={
                  item?.status === 'SUCCESS'
                    ? 'outline-success'
                    : 'outline-danger'
                }
              />
            </div>
          ) : (
            '--'
          ),
        };
        return dispatchRender[type];
      },
      [type]
    );

  return (
    <PageLayout>
      <Filter form={query} onSubmit={onSubmit} isLoading={isLoading} />
      <Table
        withHover
        isInfiniteTable
        isLoading={isLoading}
        isFetching={isFetching}
        data={data?.pages ?? []}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <Column
          label="Transaction ID"
          value="transaction_id"
          className="w-36 xl:w-32"
        />
        <Column label="Channel" value="channel" className="w-36 xl:w-32" />
        <Column
          label="Status"
          value={useRenderColumn('status')}
          className="w-36 xl:w-32"
        />
        <Column label="Amount" value="amount" className="w-36 xl:w-32" />
        <Column label="Date" value="human_date" className="w-36 xl:w-32" />
        <Column label="Remarks" value="remakrs" className="w-36 xl:w-32" />
      </Table>
    </PageLayout>
  );
}

export default AllTransactions;
