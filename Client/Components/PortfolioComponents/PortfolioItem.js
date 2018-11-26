import React from 'react';

/**
 * COMPONENT
 */
const PortfolioItem = props => {
  const { tickerSymbol, quantity, currentPrice, openPrice } = props.asset;
  return (
    <div className={this.findColor(currentPrice, openPrice)}>
      <p>{tickerSymbol}</p>
      <p>{quantity}</p>
      <p>{`$${currentPrice.toFixed(2)}`}</p>
      <p>{`$${(currentPrice * quantity).toFixed(2)}`}</p>
    </div>
  );
};

// Returns class names with proper color for text
PortfolioItem.prototype.findColor = (currentPrice, openPrice) => {
  if (openPrice > currentPrice) {
    return 'red flexRow singleAsset';
  } else if (currentPrice > openPrice) {
    return 'green flexRow singleAsset';
  } else {
    return 'grey flexRow singleAsset';
  }
};

export default PortfolioItem;
