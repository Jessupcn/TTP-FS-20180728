import React, { Component } from 'react';
import { connect } from 'react-redux';
import { purchase } from '../../Store';

/**
 * COMPONENT
 */
const MakeTransaction = props => {
  const { user, handleSubmit, error } = props;
  if (user) {
    console.log('USER: ', user);
  }
  return (
    <div>
      <h4>MakeTransaction:</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Stock Symbol:</p>
          <input name="tickerSymbol" type="text" placeholder="Ticker Symbol" />
        </div>
        <div>
          <p>Quantity:</p>
          <input name="quantity" type="text" placeholder="Quantity" />
        </div>
        <div>
          <button type="submit">Purchase</button>
        </div>
        {error && error.response ? <div>{error.response.data}</div> : null}
      </form>
    </div>
  );
};

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
    handleSubmit(evt) {
      evt.preventDefault();
      const transactionInfo = {
        tickerSymbol: evt.target.tickerSymbol.value,
        quantity: evt.target.quantity.value
      };
      dispatch(purchase(transactionInfo));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MakeTransaction);
