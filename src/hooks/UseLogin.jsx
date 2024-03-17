import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import loginUser from '../api/loginUser';
import signupUser from '../api/signupUser';

const useLogin = () => {
  const [error, setError] = useState();

  const ctx = useContext(AuthContext);

  const login = async (user) => {
    setError(null);

    let response, json;

    if (ctx.userExists) {
      const data = { email: user.email, password: user.password };
      response = await loginUser(data);
      json = await response.json();
    } else {
      response = await signupUser(user);
      json = await response.json();
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      ctx.setLogin({ user: json, loggedIn: true });
      return true;
    }
    if (!response.ok) {
      setError(json.error);
      return false;
    }
  };
  return { error, setError, login };
};

export default useLogin;
