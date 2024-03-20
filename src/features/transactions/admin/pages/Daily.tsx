import PageLayout from 'layouts/page-layout';

import LineGrapCard from '../cards/LineGraphCard';
import PartnersCard from '../cards/PartnersCard';
import SubscribersCard from '../cards/SubscribersCard';

function Daily() {
  return (
    <PageLayout withScroll>
      <LineGrapCard />
      <PartnersCard />
      <SubscribersCard />
    </PageLayout>
  );
}

export default Daily;
