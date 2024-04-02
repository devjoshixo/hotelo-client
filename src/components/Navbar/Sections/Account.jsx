import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Account.module.css';
import useOutSideClick from '../../../hooks/UseOutsideClick';
import AuthContext from '../../../context/AuthContext';
import UseLogout from '../../../hooks/UseLogout';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';

const Account = (props) => {
  const [signInref, signIn, setSignIn] = useOutSideClick();
  const ctx = useContext(AuthContext);
  const logout = UseLogout();
  const location = useLocation();
  const history = useHistory();

  const redirectLogin = () => {
    sessionStorage.setItem(
      'redirect',
      JSON.stringify({ redirect: location.pathname + location.search })
    );

    history.push('/account/login');
  };

  return (
    <div
      className={classes.navtitle}
      onClick={() => {
        setSignIn(true);
      }}
    >
      <p className={props.classes}>
        {ctx.login.loggedIn ? ctx.login.user.firstname : 'Sign in'}
      </p>
      {signIn && (
        <div className={classes.floating} ref={signInref}>
          {ctx.login.loggedIn ? (
            <div
              className={`${classes.loggedin} ${signIn ? '' : classes.hidden}`}
            >
              Hi,{ctx.login.user.firstname}
              <button className={classes.logout} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div
              className={`${classes.loggedout} ${signIn ? '' : classes.hidden}`}
            >
              <h2 className={classes.offer}>
                Save an average of 15% on thousands of hotels when you're signed
                in
              </h2>

              <button className={classes.signInAction} onClick={redirectLogin}>
                Sign in
              </button>

              <p onClick={redirectLogin} className={classes.link}>
                Sign up, it's free
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
