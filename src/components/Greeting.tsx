import React from 'react';
import {useAuth} from '../context/auth';

const Greeting: React.FC = () => {
  const auth = useAuth();
  if (auth.isLoggedIn) {
    return <h1>Hallo, {auth.userName}</h1>;
  }
  return <h1>ToDo App</h1>;
};

export default Greeting;
