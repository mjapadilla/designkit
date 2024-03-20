import dayjs from 'dayjs';

import { RangeType } from 'ui/components';
import { LineGraph } from 'ui/graph';

import { formatCurrency, formatNumber } from 'utils';

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

function LineGrapCard() {
  return (
    <div className="card grid gap-3 shadow-none">
      <div className="flex">
        <div className="flex flex-shrink-0 items-center">
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
        <div className="ml-auto flex space-x-5">
          <div className="rounded-md border-b-[3px] border-primary-500 px-5 py-3">
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold leading-none text-gray-500">
                TOTAL AMOUNT
              </h4>
              <p className="text-sm font-semibold leading-none text-primary-500">
                {formatCurrency(String(Math.floor(Math.random() * 10000)))}
              </p>
            </div>
          </div>
          <div className="rounded-md border-b-[3px] border-primary-500 px-5 py-3">
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold leading-none text-gray-500">
                TOTAL TRANSACTIONS
              </h4>
              <p className="text-sm font-semibold leading-none text-primary-500">
                {formatNumber(String(Math.floor(Math.random() * 10000)), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-96 w-full">
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
                bottom: -5,
                top: 0,
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
    </div>
  );
}

export default LineGrapCard;
