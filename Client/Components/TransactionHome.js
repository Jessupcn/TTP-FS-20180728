import React from 'react';

// component imports
import NavBar from './NavBar';
import { MakeTransaction } from './TransactionComponents';

const TransactionHome = () => {
  return (
    <div>
      <NavBar />
      <MakeTransaction />
    </div>
  );
};

export default TransactionHome;
