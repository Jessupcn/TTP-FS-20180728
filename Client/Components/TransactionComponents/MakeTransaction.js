import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTransaction, postAsset, updateBalance } from '../../Store';
const axios = require('axios');

/**
 * COMPONENT
 */
class MakeTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerSymbol: '',
      quantity: '',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const change = {};
    change[evt.target.name] = evt.target.value;
    this.setState(change);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (isNaN(+this.state.quantity)) {
      return this.setState({ error: 'Please enter a valid number.' });
    }
    const transactionInfo = {
      tickerSymbol: this.state.tickerSymbol.toUpperCase(),
      userId: this.props.user.id,
      quantity: this.state.quantity,
      userBalance: this.props.user.balance
    };
    const balanceInfo = {
      userId: this.props.user.id
    };
    axios
      .get(
        `https://api.iextrading.com/1.0/stock/${
          transactionInfo.tickerSymbol
        }/quote`
      )
      .then(stockInfo => stockInfo.data)
      .then(
        stockInfo => {
          if (
            this.props.user.balance >
            stockInfo.latestPrice * transactionInfo.quantity * 100
          ) {
            console.log('BALANCE: ', this.props.user.balance);
            console.log('STOCK PRICE: ', stockInfo.latestPrice * 100);
            transactionInfo.price = stockInfo.latestPrice * 100;
            balanceInfo.balance =
              this.props.user.balance -
              transactionInfo.price * transactionInfo.quantity;
            this.props.handleFormSubmit(transactionInfo, balanceInfo);
          } else {
            return this.setState({ error: 'Your balance is too low.' });
          }
        },
        err => {
          console.log('ERROR: ', err);
        }
      )
      .catch();

    this.setState({ tickerSymbol: '', quantity: '', error: null });
  }

  postToPortfolio(transactionInfo) {
    this.props.handlePostToPort(transactionInfo);
  }

  render() {
    const { user, error } = this.props;
    console.log('STATE: ', this.state);
    console.log('ERROR: ', error);
    return (
      <div className="innerCompRight flex-col">
        <h3>{`Available Balance: $${(user.balance / 100).toFixed(2)}`}</h3>
        <h4>MakeTransaction:</h4>
        <form className="flex-col" onSubmit={evt => this.handleSubmit(evt)}>
          <div>
            <p className="overInput">Stock Symbol:</p>
            <input
              name="tickerSymbol"
              type="text"
              placeholder="Ticker Symbol"
              onChange={this.handleChange}
              value={this.state.tickerSymbol.toUpperCase()}
            />
          </div>
          <div>
            <p className="overInput">Quantity:</p>
            <input
              name="quantity"
              type="text"
              placeholder="Quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </div>
          <button className="formButton" type="submit">
            Purchase
          </button>
          {error && error.response ? (
            <div className="error red">{error.response.data}</div>
          ) : null}
          {this.state.error ? (
            <div className="error red">{this.state.error}</div>
          ) : null}
        </form>
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
    error: state.transactions.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleFormSubmit(transactionInfo, balanceInfo) {
      dispatch(postTransaction(transactionInfo));
      dispatch(postAsset(transactionInfo));
      dispatch(updateBalance(balanceInfo));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MakeTransaction);
