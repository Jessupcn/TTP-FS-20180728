import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../Store';

/**
 * COMPONENT
 */
const SignUp = props => {
  const { error, handleSubmit } = props;
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <h4>New User:</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Name:</p>
          <input name="name" type="text" />
        </div>
        <div>
          <p>Email:</p>
          <input name="email" type="text" />
        </div>
        <div>
          <p>Password:</p>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Sign In</button>
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
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = 'login';
      const userInfo = {
        name: evt.target.name.value,
        email: evt.target.email.value,
        password: evt.target.password.value
      };
      dispatch(auth(userInfo, formName));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(SignUp);
