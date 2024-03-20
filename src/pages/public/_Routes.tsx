import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/_Home'));

function Layout() {
  return (
    <Switch>
      <Route path="/*" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  );
}

export default Layout;
