import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components';

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}

      {/* Which component to display as a fallback? */}
      <Route component={Home} />
    </Switch>
  );
};

export default Routes;
