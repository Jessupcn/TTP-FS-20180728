import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { AuthHome, TransactionHome, PortfolioHome } from './Components';
import { loggedIn, fetchAssets, fetchTransactions } from './Store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    if (this.props.user && this.props.user.id) {
      this.props.loadUserData(this.props.user.id);
    }
  }

  // Runs update when user is added to props to fetch more data
  shouldComponentUpdate(newProps) {
    if (newProps.user && newProps.user.id) {
      this.props.loadUserData(newProps.user.id);
      return true;
    }
    if (!newProps.user.id) {
      return true;
    }
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
        {/* Display Auth page as a fallback*/}
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
    user: state.user,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(loggedIn());
    },
    loadUserData(userId) {
      dispatch(fetchTransactions(userId));
      dispatch(fetchAssets(userId));
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
