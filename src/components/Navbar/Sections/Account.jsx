import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Account.module.css';
const Account = (props) => {
  const [modal, setModal] = useState(false);
  return (
    <div
      className={classes.navtitle}
      onMouseEnter={() => {
        setModal(true);
      }}
      onMouseLeave={() => {
        setModal(false);
      }}
    >
      <p className={props.classes}>Sign in</p>
      {modal && (
        <div className={classes.floating}>
          <div
            className={`${classes.loggedout} ${modal ? '' : classes.hidden}`}
          >
            <h2 className={classes.offer}>
              Save an average of 15% on thousands of hotels when you're signed
              in
            </h2>
            <Link to='/account/login'>
              <button className={classes.signInAction} href={'/account/signin'}>
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
