import dayjs from 'dayjs';
import { uniqueId } from 'lodash';

import { RangeType } from 'ui/components';
import { LineGraph } from 'ui/graph';
import createTable from 'ui/table';

import { formatCurrency } from 'utils';

const format = 'YYYY-MM-DD';

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

type TProps = {
  name: string;
  amount: string;
};

const { Table, Column } = createTable<TProps>();

function SubscriberTransactionCard() {
  return (
    <div className="card flex h-full w-full flex-col shadow-none">
      <div className="flex">
        <div className="w-full">
          <h4 className="card-title">Subscriber Transactions</h4>
          <p className="card-description">Lorem ipsum dolor sit</p>
        </div>
        <div className="flex flex-shrink-0 items-start">
          <RangeType
            onSubmit={() => {}}
            value={{
              label: 'Monthly',
              value: 'MONTH',
              date_from: dayjs().startOf('year').format(format),
              date_to: dayjs().endOf('year').format(format),
            }}
          />
        </div>
      </div>
      <div className="flex h-full flex-1 space-x-2 overflow-hidden">
        <div className="w-full">
          <LineGraph
            data={{
              labels: labels,
              datasets: [
                {
                  fill: false,
                  label: 'Transaction',
                  data: (labels ?? [])?.map(() =>
                    Math.floor(Math.random() * 10000)
                  ),
                  backgroundColor: 'rgba(3, 110, 110, .8)',
                  borderColor: 'rgba(3, 110, 110, 1)',
                  borderWidth: 2.5,
                  tension: 0.1,
                  pointHoverRadius: 6,
                  pointBorderWidth: 3,
                  pointBackgroundColor: 'rgba(3, 110, 110, 1)',
                },
              ],
            }}
            options={{
              aspectRatio: 1,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              layout: {
                autoPadding: false,
                padding: {
                  bottom: -10,
                  top: 10,
                  left: -10,
                  right: -10,
                },
              },
              scales: {
                x: {
                  ticks: {
                    padding: 10,
                    display: true,
                    backdropPadding: 0,
                  },
                  border: {
                    display: true,
                  },
                  grid: {
                    lineWidth: 1.5,
                    drawTicks: false,
                    offset: false,
                    color: 'rgba(239, 239, 239, 1)',
                  },
                },
                y: {
                  beginAtZero: true,
                  border: {
                    display: false,
                  },
                  grid: {
                    lineWidth: 1.5,
                    drawTicks: false,
                    offset: false,
                    color: 'rgba(239, 239, 239, 1)',
                  },
                  ticks: {
                    backdropPadding: 0,
                    display: true,
                    padding: 10,
                  },
                },
              },
            }}
          />
        </div>
        <div className="mt-4 w-full overflow-hidden">
          <Table
            withHover
            data={labels?.map((i) => ({
              name: i,
              uuid: uniqueId(),
              amount: formatCurrency(String(Math.floor(Math.random() * 10000))),
            }))}
          >
            <Column label="Name" value="name" className="w-32" />
            <Column label="Amount" value="amount" className="w-32" />
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SubscriberTransactionCard;
