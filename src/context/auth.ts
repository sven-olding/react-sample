import React, {useContext} from 'react';

export interface AuthContextInterface {
  isLoggedIn: boolean;
  userName?: string;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isLoggedIn: false,
});

export const useAuth = (): AuthContextInterface => {
  return useContext(AuthContext);
};
