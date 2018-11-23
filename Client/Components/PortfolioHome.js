import React from 'react';

// component imports
import NavBar from './NavBar';
import { UsersPortfolio } from './PortfolioComponents';

const PortfolioHome = () => {
  return (
    <div>
      <NavBar />
      <UsersPortfolio />
    </div>
  );
};

export default PortfolioHome;
