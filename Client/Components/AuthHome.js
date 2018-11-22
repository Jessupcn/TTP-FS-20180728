import React from 'react';

// component imports
import { SignIn, SignUp } from './AuthComponents';

const AuthHome = () => {
  return (
    <div className="AuthContainer flexRow shadow">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default AuthHome;
