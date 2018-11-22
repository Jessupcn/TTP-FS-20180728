import React from 'react';

// component imports
import NavBar from './NavBar';
import { MakeTransaction, UsersTransactions } from './TransactionComponents';

const TransactionHome = () => {
  return (
    <div>
      <NavBar />
      <UsersTransactions />
      <MakeTransaction />
    </div>
  );
};

export default TransactionHome;
