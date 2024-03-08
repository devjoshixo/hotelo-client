import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Account.module.css';
import useOutSideClick from '../../../hooks/UseOutsideClick';
import AuthContext from '../../../context/AuthContext';
import UseLogout from '../../../hooks/UseLogout';

const Account = (props) => {
  const [signInref, signIn, setSignIn] = useOutSideClick();
  const ctx = useContext(AuthContext);
  const logout = UseLogout();

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
              <Link to='/account/login'>
                <button
                  className={classes.signInAction}
                  href={'/account/signIn'}
                >
                  Sign in
                </button>
              </Link>
              <Link to='/account/login' className={classes.link}>
                Sign up, it's free
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
