import React from 'react';

import {useAuth} from '../context/auth';
import {Route, Redirect} from 'react-router-dom';

export interface PrivateRouteProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (
  props: PrivateRouteProps,
) => {
  const {component, path, exact} = props;
  const auth = useAuth();
  console.log(path);

  return auth.isLoggedIn ? (
    <Route path={path} component={component} exact={exact} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
