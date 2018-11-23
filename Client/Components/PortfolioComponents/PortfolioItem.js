import React from 'react';

/**
 * COMPONENT
 */
const PortfolioItem = props => {
  const { tickerSymbol, quantity, currentPrice, total } = props.transaction;
  const dollarPrice = currentPrice / 100;
  return (
    <div className="flexRow">
      <p>{tickerSymbol}</p>
      <p>{quantity}</p>
      <p>{`$${dollarPrice.toFixed(2)}`}</p>
    </div>
  );
};

export default PortfolioItem;
