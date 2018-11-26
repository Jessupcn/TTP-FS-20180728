import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortfolioItem from './PortfolioItem';

/**
 * COMPONENT
 */
class UsersPortfolio extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // returns the total value of all stocks in a user's portfolio
  findPortfolioTotal() {
    return this.props.portfolio.length
      ? this.props.portfolio
          .map(item => {
            return +(item.currentPrice * item.quantity);
          })
          .reduce((accum, item) => accum + item)
          .toFixed(2)
      : 0;
  }

  render() {
    const { portfolio, user } = this.props;
    const stockTotal = +this.findPortfolioTotal();
    const userBal = (+user.balance / 100).toFixed(2);
    return (
      <div>
        {portfolio.length ? (
          <div className="flex-col portfolio">
            <h3>{`${user.name}'s Portfolio:`}</h3>
            <div className="bot-divide">
              <div className="flexRow singleAsset label">
                <p>Stock:</p>
                <p>Shares:</p>
                <p>Current Price:</p>
                <p>Total Value:</p>
              </div>
              {portfolio.length
                ? portfolio.map(asset => {
                    return <PortfolioItem key={asset.id} asset={asset} />;
                  })
                : 'Portfolio current empty.'}
            </div>
            <div className="bot-divide">
              <div className="flexRow">
                <p>{`Stock Total: `}</p>
                <p>{`$${stockTotal}`}</p>
              </div>
              <div className="flexRow">
                <p>{`${user.name}'s Balance: `}</p>
                <p>{`$${userBal}`}</p>
              </div>
            </div>
            <h3>{`Total Portfolio: $${stockTotal + +userBal}`}</h3>
          </div>
        ) : (
          <h2>No Portfolio to show!</h2>
        )}
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
    portfolio: state.portfolio.portfolio,
    error: state.portfolio.error
  };
};

export default connect(
  mapState,
  null
)(UsersPortfolio);
