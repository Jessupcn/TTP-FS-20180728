import React from 'react';

/**
 * COMPONENT
 */
const SingleTransaction = props => {
  const { tickerSymbol, quantity, price } = props.transaction;
  const dollarPrice = price / 100;
  return (
    <div className="flexRow singleAsset">
      <p>{tickerSymbol}</p>
      <p>{quantity}</p>
      <p>{`$${dollarPrice.toFixed(2)}`}</p>
      <p>{`$${(quantity * dollarPrice).toFixed(2)}`}</p>
    </div>
  );
};

export default SingleTransaction;
