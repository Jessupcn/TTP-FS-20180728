import React from 'react';

// component imports
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthHome = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default AuthHome;
