import React from 'react';
import { connect } from 'react-redux';

// component imports
import { SignIn, SignUp } from './AuthComponents';

const AuthHome = ({ error }) => {
  return (
    <div className="AuthContainer container-shadow">
      <div className="flexRow">
        <SignIn />
        <SignUp />
      </div>
      <div>
        {error && error.response ? (
          <p className="error red">{error.response.data}</p>
        ) : null}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    error: state.user.error
  };
};

export default connect(
  mapState,
  null
)(AuthHome);
