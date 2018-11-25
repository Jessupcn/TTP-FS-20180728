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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const transactionInfo = {
      tickerSymbol: evt.target.tickerSymbol.value.toUpperCase(),
      userId: this.props.user.id,
      quantity: +evt.target.quantity.value
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
      .then(stockInfo => {
        if (this.props.user.balance > stockInfo.latestPrice * 100) {
          transactionInfo.price = stockInfo.latestPrice * 100;
          balanceInfo.balance =
            this.props.user.balance -
            transactionInfo.price * transactionInfo.quantity;
          this.props.handleFormSubmit(transactionInfo, balanceInfo);
        } else {
          console.error('Your balance is too low.');
        }
      })
      .catch();
  }

  postToPortfolio(transactionInfo) {
    this.props.handlePostToPort(transactionInfo);
  }

  render() {
    const { user, error } = this.props;
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
            />
          </div>
          <div>
            <p className="overInput">Quantity:</p>
            <input name="quantity" type="text" placeholder="Quantity" />
          </div>
          <button className="formButton" type="submit">
            Purchase
          </button>
          {error && error.response ? <div>{error.response.data}</div> : null}
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
    error: state.error
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
