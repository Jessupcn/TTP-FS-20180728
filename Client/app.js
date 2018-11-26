import React from 'react';
import Routes from './routes';
import { NavBar } from './Components';

// central component of application
const App = () => {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
};

export default App;
