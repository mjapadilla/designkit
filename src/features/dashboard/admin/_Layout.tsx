import PageLayout from 'layouts/page-layout';

import { PageHeader } from 'ui/components';

import ComparativeReportCard from './cards/ComparativeReportCard';
import SubscriberTransactionCard from './cards/SubscriberTransactionCard';
import TopPartnerCard from './cards/TopPartnerCard';
import TransactionCard from './cards/TransactionCard';
import CountCard from './components/CountCard';

function Layout() {
  return (
    <PageLayout withScroll>
      <PageHeader
        title="Dashboard"
        description="Lorem ipsum dolor sit amet consectetur. Convallis neque."
      />
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <CountCard amount="32" title="Total Partners" />
        <CountCard amount="1,230" title="Total Subscribers" />
        <CountCard amount="302" title="Pending Disbursements" />
        <CountCard amount="32" title="Total Disbursed" />
      </div>
      <div className="flex h-auto flex-row gap-4 md:h-104">
        <div className="w-4/12">
          <TopPartnerCard />
        </div>
        <div className="w-8/12">
          <SubscriberTransactionCard />
        </div>
      </div>
      <div className="h-104">
        <TransactionCard />
      </div>
      <ComparativeReportCard />
    </PageLayout>
  );
}

export default Layout;
