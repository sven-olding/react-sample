import React from 'react';

import {hot} from 'react-hot-loader/root';

import ToDoList from './components/ToDoList';
import Greeting from './components/Greeting';
import SignIn from './components/SignIn';
import {AuthContext} from './context/auth';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';

export const App: React.FC = () => {
  return (
    <AuthContext.Provider value={{isLoggedIn: false}}>
      <BrowserRouter>
        <div id="container">
          <header>
            <Greeting />
          </header>
          <main>
            <Switch>
              <Route path="/login" exact={true} component={SignIn} />
              <Route path="/signup" exact={true} component={SignUp} />
              <PrivateRoute path="/" exact={true} component={ToDoList} />
            </Switch>
          </main>
          <footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default hot(App);
