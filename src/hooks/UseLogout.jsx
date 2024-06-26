import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const UseLogout = () => {
  const ctx = useContext(AuthContext);
  const logout = (event) => {
    window.location.reload();
    if (event) {
      event.preventDefault();
    }
    localStorage.removeItem('user');
    ctx.setLogin({ user: null, loggedIn: false });
  };
  return logout;
};

export default UseLogout;
