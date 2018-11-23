import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { AuthHome, TransactionHome, PortfolioHome } from './components';
import { loggedIn } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are available to logged in users */}
            <Route path="/transactions" component={TransactionHome} />
            <Route path="/portfolio" component={PortfolioHome} />
            <Route component={TransactionHome} />
          </Switch>
        )}
        {/* Display Auth page as a fallback */}
        <Route component={AuthHome} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Is a user logged in
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(loggedIn());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);
