import React, { useState } from 'react';
import classes from './Email.module.css';
import google from '../../assets/Google.svg';
import { useCheckemail } from '../../hooks/UseCheckemail';

const Email = (props) => {
  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const { checkEmailHook, error } = useCheckemail();

  const submitEmailHandler = async (event) => {
    event.preventDefault();
    const done = await checkEmailHook(props.formDetails.email);
    if (done) {
      props.setEmailPage(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitEmailHandler}>
      <h4 className={classes.heading}>Sign in or create an account</h4>
      <p className={classes.offer}>
        Save an average of 15% on thousands of hotels as a member—it’s always
        free.
      </p>
      <div className={classes.google}>
        <button>Sign in with Google</button>
        <div>
          <img src={google} />
        </div>
      </div>
      <p className={`${classes.or} ${classes.offer}`}>or</p>

      <input
        type='email'
        placeholder='Email'
        name='email'
        value={props.formDetails.email}
        className={classes.email}
        onChange={formDetailChangeHandler}
      />
      <p>{error}</p>
      <button className={classes.action} type='submit'>
        Continue
      </button>
    </form>
  );
};

export default Email;
