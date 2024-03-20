import { Route, Routes as Switch } from 'react-router-dom';

import { ROUTES } from './_directory';
import Layout from './_Layout';

function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Layout />}>
        {ROUTES?.map((i) => (
          <Route
            key={i?.key}
            path={i?.path}
            element={i.component ? <i.component /> : <div />}
          />
        ))}
      </Route>
    </Switch>
  );
}

export default Routes;
