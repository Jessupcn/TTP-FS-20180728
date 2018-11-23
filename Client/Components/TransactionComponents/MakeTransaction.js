import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTransaction } from '../../Store';

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
      userId: this.props.user.id,
      tickerSymbol: evt.target.tickerSymbol.value,
      quantity: evt.target.quantity.value
    };
    this.props.handleFormSubmit(transactionInfo);
  }

  render() {
    const { user, error } = this.props;
    return (
      <div>
        <h3>{`Available Balance: $${user.balance / 100}`}</h3>
        <h4>MakeTransaction:</h4>
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <div>
            <p>Stock Symbol:</p>
            <input
              name="tickerSymbol"
              type="text"
              placeholder="Ticker Symbol"
            />
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
    handleFormSubmit(transactionInfo) {
      dispatch(postTransaction(transactionInfo));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MakeTransaction);
