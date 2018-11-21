import React from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const NavBar = ({ handleClick, isLoggedIn }) => {
  return (
    <div className="NavBar">
      <h3>Simple Stocks</h3>
      <div>
        <Link to={`/home`}>Resume</Link>
      </div>
      <div>
        <Link to={`/home`}>Projects</Link>
      </div>
      <div>
        <Button onClick={handleClick}>Log Out</Button>
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
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

export default NavBar;
