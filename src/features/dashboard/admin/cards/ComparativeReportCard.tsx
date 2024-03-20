import classNames from 'classnames';
import dayjs from 'dayjs';

import { RangeType } from 'ui/components';

import CollectionChart from '../components/CollectionChart';
import CollectionTable from '../components/CollectionTable';
import TransactionChart from '../components/TransactionChart';
import TransactionRevenueTable from '../components/TransactionRevenueTable';
import TransactionTable from '../components/TransactionTable';

const format = 'YYYY-MM-DD';

const Title = ({
  title,
  description,
  titleClassName,
}: {
  title: string;
  description: string;
  titleClassName?: string;
}) => (
  <div className="w-full">
    <h4
      className={classNames('card-title text-sm font-medium', titleClassName)}
    >
      {title}
    </h4>
    <p className="card-description">{description}</p>
  </div>
);

function ComparativeReportCard() {
  return (
    <div className="card h-full w-full shadow-none">
      <div className="flex">
        <Title
          title="Comparative Reports"
          description="Lorem ipsum dolor sit"
          titleClassName="!text-base font-semibold"
        />
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
      <div className="mt-6 space-y-6">
        <Title
          title="Transaction / Revenue Comparison"
          description="Lorem ipsum dolor sit"
        />
        <TransactionRevenueTable />
        <hr className="border-t border-neutral-200" />
        <Title
          title="Collections Line Chart"
          description="Lorem ipsum dolor sit"
        />
        <div className="h-104">
          <CollectionChart />
        </div>
        <hr className="border-t border-neutral-200" />
        <Title
          title="Transaction Bar Chart"
          description="Lorem ipsum dolor sit"
        />
        <div className="h-104">
          <TransactionChart />
        </div>
        <hr className="border-t border-neutral-200" />
        <Title
          title="Monthly Collections and Transactions"
          description="Lorem ipsum dolor sit"
        />
        <CollectionTable />
        <hr className="border-t border-neutral-200" />
        <TransactionTable />
      </div>
    </div>
  );
}

export default ComparativeReportCard;
