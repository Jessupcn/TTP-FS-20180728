import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../../Store';
// var ScrollArea = require('react-scrollbar');
import ScrollArea from 'react-scrollbar';

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
      console.log('COMPONENT DID MOUNT WITH USER');
      fetchTransactions(this.props.user.id);
    }
  }

  render() {
    const { user, transactions } = this.props;
    console.log('USER TRANSACTIONS: ', transactions);
    return (
      <div>
        <h1>hi</h1>
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

export default connect(
  mapState,
  null
)(UsersTransactions);
