import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../../Store';
import PortfolioItem from './PortfolioItem';

/**
 * COMPONENT
 */
class UsersPortfolio extends Component {
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
      <div>
        <div className="flexRow singleTransactions">
          <p>Stock:</p>
          <p>Shares:</p>
          <p>Price:</p>
        </div>
        {
          <div>
            {transactions.length
              ? transactions.map(transaction => (
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
    transactions: state.transactions
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
)(UsersPortfolio);
