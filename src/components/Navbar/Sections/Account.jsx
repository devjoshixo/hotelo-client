import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Account.module.css';
import useOutSideClick from '../../../hooks/UseOutsideClick';

const Account = (props) => {
  const [signInref, signIn, setSignIn] = useOutSideClick();
  return (
    <div
      className={classes.navtitle}
      onClick={() => {
        setSignIn(true);
      }}
    >
      <p className={props.classes}>Sign in</p>
      {signIn && (
        <div className={classes.floating} ref={signInref}>
          <div
            className={`${classes.loggedout} ${signIn ? '' : classes.hidden}`}
          >
            <h2 className={classes.offer}>
              Save an average of 15% on thousands of hotels when you're signed
              in
            </h2>
            <Link to='/account/login'>
              <button className={classes.signInAction} href={'/account/signIn'}>
                Sign in
              </button>
            </Link>
            <Link to='/account/login' className={classes.link}>
              Sign up, it's free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
