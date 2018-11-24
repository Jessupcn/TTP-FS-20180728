import React from 'react';

/**
 * COMPONENT
 */
const PortfolioItem = props => {
  const { tickerSymbol, quantity, currentPrice } = props.asset;
  return (
    <div className="flexRow singleAsset">
      <p>{tickerSymbol}</p>
      <p>{quantity}</p>
      <p>{`$${currentPrice.toFixed(2)}`}</p>
      <p>{`$${(currentPrice * quantity).toFixed(2)}`}</p>
    </div>
  );
};

export default PortfolioItem;
