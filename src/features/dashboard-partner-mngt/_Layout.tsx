import PageLayout from 'layouts/page-layout';

import { CountCard } from 'ui/components';

import { formatCurrency, formatNumber } from 'utils';

import TopPartnersByAmountCard from './cards/TopPartnersByAmountCard';
import TopPartnersByTransactionCard from './cards/TopPartnersByTransactionCard';

function Layout() {
  return (
    <PageLayout withScroll>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 2xl:grid-cols-4">
        <CountCard
          title="Total Partners"
          value={formatNumber(String(Math.floor(Math.random() * 1000000)), 0)}
        />
        <CountCard
          title="Total Transactions"
          value={formatNumber(String(Math.floor(Math.random() * 1000000)), 0)}
        />
        <CountCard
          title="Disbursement Amount"
          value={formatCurrency(String(Math.floor(Math.random() * 1000000)))}
        />
      </div>
      <TopPartnersByTransactionCard />
      <TopPartnersByAmountCard />
    </PageLayout>
  );
}

export default Layout;
