import React from 'react';

// component imports
import { MakeTransaction, UsersTransactions } from './TransactionComponents';

const TransactionHome = () => {
  return (
    <div className="container-shadow flexRow">
      <UsersTransactions />
      <MakeTransaction />
    </div>
  );
};

export default TransactionHome;
