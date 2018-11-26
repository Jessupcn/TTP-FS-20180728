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

  // Updates local state with changes to form fields
  handleChange(evt) {
    const change = {};
    change[evt.target.name] = evt.target.value;
    this.setState(change);
  }

  // Handles form submission
  handleSubmit(evt) {
    evt.preventDefault();
    // returns an error if a valid number is not entered
    if (isNaN(+this.state.quantity)) {
      return this.setState({ error: 'Please enter a valid number.' });
    }
    // Info to pass to database
    const transactionInfo = {
      tickerSymbol: this.state.tickerSymbol.toUpperCase(),
      userId: +this.props.user.id,
      quantity: +this.state.quantity,
      userBalance: this.props.user.balance
    };

    axios
      .get(
        `https://api.iextrading.com/1.0/stock/${
          transactionInfo.tickerSymbol
        }/quote`
      )
      .then(stockInfo => stockInfo.data)
      .then(stockInfo => {
        if (
          this.props.user.balance >
          stockInfo.latestPrice * transactionInfo.quantity * 100
        ) {
          transactionInfo.price = stockInfo.latestPrice * 100;
          this.props.handleFormSubmit(transactionInfo);
        } else {
          return this.setState({ error: 'Your balance is too low.' });
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          this.setState({ error: 'Please input a valid stock.' });
        }
      });

    this.setState({ tickerSymbol: '', quantity: '', error: null });
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
          {/* Display errors if an error is returned or a front end error occurs. */}
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
    handleFormSubmit(transactionInfo) {
      dispatch(postTransaction(transactionInfo));
      dispatch(postAsset(transactionInfo));
      dispatch(updateBalance(transactionInfo));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MakeTransaction);
