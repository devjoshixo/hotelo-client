import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthState = (props) => {
  const [login, setLogin] = useState({ user: null, loggedIn: false });
  const [userExists, setUserExists] = useState(false);

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
