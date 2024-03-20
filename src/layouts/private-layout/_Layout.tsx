import React from 'react';
import { Outlet } from 'react-router-dom';

import { SIDEBAR_PROVIDER } from './_constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function Layout() {
  const [show, setShow] = React.useState(false);

  const x = React.useMemo(() => ({ show, setShow }), [show, setShow]);

  return (
    <SIDEBAR_PROVIDER.Provider value={x}>
      <div
        className="flex flex-1 flex-col md:h-screen md:flex-row md:overflow-hidden"
        id="root-wrapper"
      >
        <Sidebar />
        <div className="flex-1 md:flex md:flex-col md:overflow-hidden">
          <Header />
          <main className="relative flex h-full w-full flex-1 flex-col bg-gray-50 focus:outline-none md:overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SIDEBAR_PROVIDER.Provider>
  );
}

export default Layout;
