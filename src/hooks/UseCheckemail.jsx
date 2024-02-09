import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import checkEmail from '../api/checkEmail';

export const useCheckemail = () => {
  const [error, setError] = useState(null);

  const ctx = useContext(AuthContext);

  const checkEmailHook = async (email) => {
    setError(null);

    const response = await checkEmail(email);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      return false;
    }
    if (response.ok) {
      ctx.setUserExists(json.userExists);
      return true;
    }
  };
  return { checkEmailHook, error };
};
