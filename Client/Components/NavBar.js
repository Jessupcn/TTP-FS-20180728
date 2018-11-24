import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, logoutTransactions, logoutPortfolio } from '../Store';

/**
 * COMPONENT
 */
const NavBar = ({ handleClick, isLoggedIn }) => {
  return (
    <div className="navbar">
      <h3>Simple Stocks</h3>
      {// only display nav items if a user is logged in
      isLoggedIn ? (
        <div className="nav-items flexRow">
          <div>
            <Link className="nav-item" to={`/portfolio`}>
              Portfolio
            </Link>
          </div>
          <div>
            <Link className="nav-item" to={`/transactions`}>
              Transactions
            </Link>
          </div>
          <div>
            <button className="nav-item" onClick={handleClick}>
              Log Out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logoutTransactions());
      dispatch(logoutPortfolio());
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(NavBar);
