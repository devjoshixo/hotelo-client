import React, { useState } from 'react';
import AuthContext from './AuthContext';
import verifyToken from '../api/verifyToken';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const AuthState = (props) => {
  const [login, setLogin] = useState({ user: null, loggedIn: false });
  const [userExists, setUserExists] = useState(false);
  const location = useLocation();

  const redirectUser = () => {
    console.log(location.pathname);
  };

  useState(() => {
    const verify_and_login = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const resposne = await verifyToken(user.token);
        if (resposne.error) {
          localStorage.clear('user');
          return;
        }
        setLogin({ user: user, loggedIn: true });
      }
    };
    verify_and_login();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, setLogin, userExists, setUserExists }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
