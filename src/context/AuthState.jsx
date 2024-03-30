import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const AuthState = (props) => {
  const [login, setLogin] = useState({ user: null, loggedIn: false });
  const [userExists, setUserExists] = useState(false);
  const location = useLocation();

  const redirectUser = () => {
    console.log(location.pathname);
  };

  useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLogin({ user: user, loggedIn: true });
    }
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
