import { isEmpty } from 'lodash';
import { Route, Routes as Switch } from 'react-router-dom';

import { TDirectory } from 'types';

import ProfileProvider from 'context/profile';
import RootUrlProvider from 'context/root-url';

import BreadedLayout, { BreadedRoute } from 'layouts/breaded-layout';
import PrivateLayout from 'layouts/private-layout';

import { NoPermission, Page404, PageTitle } from 'ui/components';

import { sideBarOutlet } from './_utils';
import Logout from './pages/_Logout';

function renderOutlet(x: TDirectory, parentPath?: string) {
  const { key, path, to, name, groups = [] } = x;

  const hasGroup = groups?.length > 0;

  const $path = !parentPath ? path : parentPath + path;
  const $to = !parentPath ? path : parentPath + to;

  return (
    <Route
      key={key}
      path={`${path}/*`}
      element={
        <RootUrlProvider value={$path}>
          <BreadedRoute url={$to} label={name ?? ''}>
            {!hasGroup ? (
              <>
                <PageTitle title={name} />
                {x.component && <x.component />}
              </>
            ) : (
              <Switch>
                {groups?.map((i) => renderOutlet(i, path))}
                <Route path="*" element={<Page404 withDelay />} />
              </Switch>
            )}
          </BreadedRoute>
        </RootUrlProvider>
      }
    />
  );
}

function Layout() {
  const SIDEBAR_OUTLET = sideBarOutlet();

  if (isEmpty(SIDEBAR_OUTLET))
    return (
      <Switch>
        <Route path="/*" element={<NoPermission />} />
        <Route path="/logout" element={<Logout />} />
      </Switch>
    );

  return (
    <ProfileProvider>
      <BreadedLayout>
        <Switch>
          <Route path="/" element={<PrivateLayout />}>
            {SIDEBAR_OUTLET?.map((i) => renderOutlet(i))}
            <Route path="*" element={<Page404 withDelay />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Switch>
      </BreadedLayout>
    </ProfileProvider>
  );
}

export default Layout;
