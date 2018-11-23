import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssets } from '../../Store';
import PortfolioItem from './PortfolioItem';
import { AssertionError } from 'assert';

/**
 * COMPONENT
 */
class UsersPortfolio extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadPortfolio(this.props.user.id);
    }
  }

  render() {
    const { portfolio } = this.props;
    return (
      <div>
        <div className="flexRow singleTransactions">
          <p>Stock:</p>
          <p>Shares:</p>
          <p>Current Price:</p>
        </div>
        {
          <div>
            {portfolio.length
              ? portfolio.map(asset => (
                  <PortfolioItem key={asset.id} asset={asset} />
                ))
              : 'Portfolio current empty.'}
          </div>
        }
        <div>
          <h3>{`Portfolio Total: $${50}`}</h3>
        </div>
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
    portfolio: state.portfolio
  };
};

const mapDispatch = dispatch => {
  return {
    loadPortfolio: userId => {
      dispatch(fetchAssets(userId));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(UsersPortfolio);
