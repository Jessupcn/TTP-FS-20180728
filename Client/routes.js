import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { } from './components';

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}

      {/* Which component to display as a fallback? */}
      <Route component={} />
    </Switch>
  );
};

export default Routes;
