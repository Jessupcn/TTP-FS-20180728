import React from 'react';

// component imports
import { MakeTransaction, UsersTransactions } from './TransactionComponents';

const TransactionHome = () => {
  return (
    <div className="home-container container-shadow flexRow">
      <UsersTransactions />
      <MakeTransaction />
    </div>
  );
};

export default TransactionHome;
