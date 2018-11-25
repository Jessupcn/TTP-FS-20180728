import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../../Store';
// var ScrollArea = require('react-scrollbar');
import ScrollArea from 'react-scrollbar';
import SingleTransaction from './SingleTransaction';

/**
 * COMPONENT
 */
class UsersTransactions extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadTransactions(this.props.user.id);
    }
  }

  render() {
    const { transactions } = this.props;
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
            {transactions.length
              ? transactions
                  .slice(0)
                  .reverse()
                  .map(transaction => (
                    <SingleTransaction
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))
              : 'No known transactions'}
          </div>
        }
      </div>
    );
  }
}

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

const mapDispatch = dispatch => {
  return {
    loadTransactions: userId => {
      dispatch(fetchTransactions(userId));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(UsersTransactions);
