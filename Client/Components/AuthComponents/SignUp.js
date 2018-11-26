import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../Store';

/**
 * COMPONENT
 */
const SignUp = props => {
  const { error, handleSubmit } = props;
  if (error) {
    console.log(error);
  }
  return (
    <div className="authComp">
      <h4>New User:</h4>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div>
          <p className="overInput">Name:</p>
          <input name="name" type="text" placeholder="Name" />
        </div>
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
            Register
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
    // Handles submission of form and dispatches user login
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = 'signup';
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
