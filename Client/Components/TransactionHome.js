import React from 'react';

// component imports
import NavBar from './NavBar';
import { MakeTransaction, UsersTransactions } from './TransactionComponents';

const TransactionHome = () => {
  return (
    <div>
      <NavBar />
      <div className="flexRow">
        <UsersTransactions />
        <MakeTransaction />
      </div>
    </div>
  );
};

export default TransactionHome;
