import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../Store';

/**
 * COMPONENT
 */
const SignIn = props => {
  const { handleSubmit } = props;
  return (
    <div className="authComp">
      <h4>Sign In:</h4>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div>
          <p className="overInput">Email:</p>
          <input name="email" type="text" placeholder="Email Address" />
        </div>
        <div>
          <p className="overInput">Password:</p>
          <input name="password" type="password" placeholder="Password" />
        </div>
        <div>
          <button className="formButton" type="submit">
            Sign In
          </button>
        </div>
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
)(SignIn);
