import classNames from 'classnames';
import { uniqueId } from 'lodash';
import React from 'react';
import { HiOutlineArrowSmUp } from 'react-icons/hi';

import { Badge } from 'ui/components';
import createTable from 'ui/table';

import { formatNumber } from 'utils';

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type TResponse = {
  uuid: string;
  name: string;
  dates: {
    name: string;
    count: number;
    percent: number;
    indicator: 'UP' | 'DOWN';
  }[];
};

const data: TResponse[] = labels?.map((i) => ({
  name: i,
  uuid: uniqueId(),
  dates: [
    {
      name: '2021',
      count: Math.floor(Math.random() * 1000000),
      percent: Math.floor(Math.random() * 100),
      indicator: Math.random() < 0.5 ? 'DOWN' : 'UP',
    },
    {
      name: '2022',
      count: Math.floor(Math.random() * 1000000),
      percent: Math.floor(Math.random() * 100),
      indicator: Math.random() < 0.5 ? 'DOWN' : 'UP',
    },
    {
      name: '2023',
      count: Math.floor(Math.random() * 1000000),
      percent: Math.floor(Math.random() * 100),
      indicator: Math.random() < 0.5 ? 'DOWN' : 'UP',
    },
  ],
}));

const { Table, Column } = createTable<TResponse>();

const allNames: string[] = [];
const extractNames = (x: TResponse[]) => {
  x.forEach((month) => {
    month.dates.forEach((date) => {
      allNames.push(date.name);
    });
  });

  const uniqueNamesSet = new Set(allNames);
  const uniqueNamesArray = Array.from(uniqueNamesSet);
  return uniqueNamesArray;
};

function TransactionTable() {
  const dates = extractNames(data);
  const renderColumn = React.useMemo(
    () =>
      (dates ?? [])?.map((i) => (
        <Column
          key={i}
          label={i}
          className="w-40 text-center"
          value={(o) => {
            const x = (o?.dates ?? [])?.find((r) => r?.name === i);
            return (
              <div className="flex items-center justify-center space-x-2">
                <div className="min-w-[60px] text-right">
                  <h4>{formatNumber(String(x?.count), 0)}</h4>
                </div>
                <Badge
                  rounded
                  size="xs"
                  className="flex w-14 justify-center"
                  label={
                    <div className="flex items-center">
                      <HiOutlineArrowSmUp
                        className={classNames('h-4 w-4', '-ml-1', {
                          'rotate-180': x?.indicator === 'DOWN',
                        })}
                      />
                      <h4 className="text-xs">{x?.percent}%</h4>
                    </div>
                  }
                  color={
                    x?.indicator === 'UP' ? 'light-success' : 'light-danger'
                  }
                />
              </div>
            );
          }}
        />
      )),
    [dates]
  );

  return (
    <>
      <Table withHover data={data}>
        <Column
          label="Transactions"
          value={(i) => (
            <div className="border-r border-r-gray-200 px-4 py-2.5">
              {i?.name}
            </div>
          )}
          className="w-20 bg-neutral-100 p-0 lg:w-16"
          labelClassName="px-4 py-2.5 bg-primary-500 text-white"
        />
        {renderColumn as never}
      </Table>
    </>
  );
}

export default TransactionTable;
