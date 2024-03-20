import classNames from 'classnames';
import { uniqueId } from 'lodash';
import React from 'react';
import { HiOutlineArrowSmUp } from 'react-icons/hi';

import { Badge } from 'ui/components';
import createTable from 'ui/table';

import { formatNumber } from 'utils';

type TResponse = {
  uuid: string;
  name: string;
  total_transaction: number;
  indicator: 'UP' | 'DOWN';
  total_revenue: number;
  percent: number;
};

const YEAR: TResponse[] = [
  {
    uuid: uniqueId(),
    name: '2021',
    total_transaction: 123931,
    indicator: 'UP',
    percent: 24,
    total_revenue: 123841,
  },
  {
    uuid: uniqueId(),
    name: '2022',
    total_transaction: 173806,
    indicator: 'DOWN',
    percent: 100,
    total_revenue: 23806,
  },
  {
    uuid: uniqueId(),
    name: '2023',
    total_transaction: 123841,
    indicator: 'UP',
    percent: 24,
    total_revenue: 123841,
  },
];

const { Table, Column } = createTable<TResponse>();

function TransactionRevenueTable() {
  const useRenderColumn = (type: 'transaction' | 'revenue') =>
    React.useCallback(
      (item: TResponse) => {
        const dispatchRender = {
          transaction: (
            <div className="flex items-center justify-center space-x-2">
              <div className="min-w-[60px] text-right">
                <h4>{formatNumber(String(item?.total_transaction), 0)}</h4>
              </div>
              <Badge
                rounded
                size="xs"
                label={
                  <div className="flex items-center">
                    <HiOutlineArrowSmUp
                      className={classNames('h-4 w-4', '-ml-1', {
                        'rotate-180': item?.indicator === 'DOWN',
                      })}
                    />
                    <h4 className="text-xs">{item?.percent}%</h4>
                  </div>
                }
                color={
                  item?.indicator === 'UP' ? 'light-success' : 'light-danger'
                }
              />
            </div>
          ),
          revenue: (
            <div className="flex items-center justify-center space-x-2">
              <h4 className="min-w-[60px] text-right">
                {formatNumber(String(item?.total_revenue), 0)}
              </h4>
              <Badge
                rounded
                size="xs"
                label={
                  <div className="flex items-center">
                    <HiOutlineArrowSmUp
                      className={classNames('h-4 w-4', '-ml-1', {
                        'rotate-180': item?.indicator === 'DOWN',
                      })}
                    />
                    <h4 className="text-xs">{item?.percent}%</h4>
                  </div>
                }
                color={
                  item?.indicator === 'UP' ? 'light-success' : 'light-danger'
                }
              />
            </div>
          ),
        };
        return dispatchRender[type];
      },
      [type]
    );

  return (
    <Table withHover data={YEAR}>
      <Column label="Year" value="name" className="w-20" />
      <Column
        label="Total Transactions"
        value={useRenderColumn('transaction')}
        className="w-32 text-center"
      />
      <Column
        label="Total Revenue"
        value={useRenderColumn('revenue')}
        className="w-32 text-center"
      />
    </Table>
  );
}

export default TransactionRevenueTable;
