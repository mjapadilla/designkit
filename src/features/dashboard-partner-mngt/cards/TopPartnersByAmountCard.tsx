import dayjs from 'dayjs';
import { uniqueId } from 'lodash';

import { BarGraph } from 'ui/graph';
import createTable from 'ui/table';

import { formatCurrency, formatNumber } from 'utils';

const labels = [
  'Cebuana',
  'UnionBank',
  'Multisys',
  'UBPP',
  'BDO',
  'BPI',
  'RBank',
  'CPBB',
  'ChinaBank',
];

type TResponse = {
  name: string;
  date: string;
  uuid: string;
  amount: string;
  transaction: string;
};

type TExtendedResponse = {
  human_transactions: string;
  human_amount: string;
};

const { Table, Column } = createTable<TResponse & TExtendedResponse>();

const data = labels?.map((i) => ({
  name: i,
  uuid: uniqueId(),
  date: dayjs().format('YYYY-MM-DD'),
  transaction: String(Math.floor(Math.random() * 10000)),
  human_transactions: formatNumber(String(Math.floor(Math.random() * 10000))),
  amount: String(Math.floor(Math.random() * 10000)),
  human_amount: formatCurrency(String(Math.floor(Math.random() * 10000))),
}));

function TopPartnersByAmountCard() {
  return (
    <div className="card shadow-none">
      <div className="flex">
        <div className="w-full">
          <h4 className="card-title">Top Partners By Amount</h4>
          <p className="card-description">Lorem ipsum dolor sit</p>
        </div>
      </div>
      <div className="mt-3 grid h-104 grid-cols-2 gap-4 overflow-hidden">
        <div>
          <BarGraph
            data={{
              labels: labels,
              datasets: [
                {
                  label: '2023',
                  data: (labels ?? [])?.map(
                    () => Math.floor(Math.random() * 10000) * 10
                  ),
                  backgroundColor: 'rgba(3, 110, 110, 1)',
                  borderWidth: 0,
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
                title: {
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
                    offset: true,
                    color: 'rgba(239, 239, 239, 1)',
                  },
                },
                y: {
                  beginAtZero: true,
                  border: {
                    display: true,
                  },
                  grid: {
                    lineWidth: 1.5,
                    drawTicks: true,
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
          <Table withHover data={data}>
            <Column label="Partner" value="name" className="w-32" />
            <Column label="Amount" value="human_amount" className="w-32" />
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TopPartnersByAmountCard;
