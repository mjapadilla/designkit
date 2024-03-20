import React from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';

import { ROOT_URL } from 'context/root-url';

import PageLayout from 'layouts/page-layout';

import { SkeletonLoader, TabNavigation } from 'ui/components';

import { ROUTES } from './_directory';

function Layout() {
  const navigate = useNavigate();
  const rootUrl = React.useContext(ROOT_URL);
  const parentMatch = useMatch(`${rootUrl}/:module_code/*`);

  const { module_code } = parentMatch?.params || {};

  const onClickTab = (to: string) => {
    navigate(rootUrl + to);
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="container mx-auto px-5 py-3">
          <TabNavigation
            tabs={ROUTES}
            onClick={onClickTab}
            selected={module_code}
          />
        </div>
      </div>
      {!module_code ? (
        <PageLayout>
          <SkeletonLoader isLoading />
        </PageLayout>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Layout;
