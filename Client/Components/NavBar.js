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
      <div className="nav-items flexRow">
        <div>
          <Link to={`/home`}>Portfolio</Link>
        </div>
        <div>
          <Link to={`/home`}>Transactions</Link>
        </div>
        <div>
          <button onClick={handleClick}>Log Out</button>
        </div>
      </div>
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
