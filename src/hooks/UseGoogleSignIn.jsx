import { useContext } from 'react';
import googleUser from '../api/googleUser';
import AuthContext from '../context/AuthContext';

const useGoogleSignIn = () => {
  const ctx = useContext(AuthContext);

  const googleSignIn = async (user) => {
    const response = await googleUser({ name: user.name, email: user.email });
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      ctx.setLogin({ user: json, loggedIn: true });
    }
  };
  return { googleSignIn };
};
export default useGoogleSignIn;
