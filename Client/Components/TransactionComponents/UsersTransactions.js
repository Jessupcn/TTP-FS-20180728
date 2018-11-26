import React from 'react';
import { connect } from 'react-redux';
import SingleTransaction from './SingleTransaction';

/**
 * COMPONENT
 */
const UsersTransactions = props => {
  const { transactions } = props;
  return (
    <div className="innerCompLeft">
      <div className="flexRow singleAsset label">
        <p>Stock:</p>
        <p>Shares:</p>
        <p>Price / Share:</p>
        <p>Total:</p>
      </div>
      {
        <div>
          {transactions.length ? (
            transactions
              .slice(0)
              .reverse()
              .map(transaction => (
                <SingleTransaction
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
          ) : (
            <div className="noPort">
              <h3>No transactions found.</h3>
            </div>
          )}
        </div>
      }
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    transactions: state.transactions.transactions,
    error: state.transactions.error
  };
};

export default connect(
  mapState,
  null
)(UsersTransactions);
