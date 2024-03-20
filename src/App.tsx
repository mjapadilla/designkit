import React from 'react';

import { ROOT_SESSION } from 'context/session';

import { ScreenLoader } from 'ui/components';
import ToastMarker from 'ui/toast';

const Public = React.lazy(() => import('pages/public'));
const Private = React.lazy(() => import('pages/private'));

function App() {
  const { isAuthenticated } = React.useContext(ROOT_SESSION);

  return (
    <>
      <ToastMarker />
      <React.Suspense fallback={<ScreenLoader />}>
        {isAuthenticated ? <Private /> : <Public />}
      </React.Suspense>
    </>
  );
}

export default App;
