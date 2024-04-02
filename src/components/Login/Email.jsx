import React, { useState } from 'react';
import classes from './Email.module.css';
import google from '../../assets/Google.svg';
import { useCheckemail } from '../../hooks/UseCheckemail';
import buttonloader from '../../assets/infinite-spinner.svg';
import { useGoogleLogin } from '@react-oauth/google';
import * as JWT from 'jwt-decode';
import useGoogleSignIn from '../../hooks/UseGoogleSignIn';
import { useHistory } from 'react-router-dom';

const Email = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const { googleSignIn } = useGoogleSignIn();
  const history = useHistory();
  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const token = credentialResponse['access_token'];
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token
      );
      const credential = await response.json();

      const newJson = await googleSignIn(credential);
      props.redirecting();
      // console.log(JWT.jwtDecode(token));
    },
  });
  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const { checkEmailHook, error } = useCheckemail();

  const submitEmailHandler = async (event) => {
    setShowLoader(true);
    event.preventDefault();
    const done = await checkEmailHook(props.formDetails.email);
    if (done) {
      props.setEmailPage(false);
    }
    setShowLoader(false);
  };

  return (
    <div className={classes.wrapper}>
      <h4 className={classes.heading}>Sign in or create an account</h4>
      <p className={classes.offer}>
        Save an average of 15% on thousands of hotels as a member—it’s always
        free.
      </p>
      <div className={classes.google} onClick={login}>
        <button>Sign in with Google</button>
        <div>
          <img src={google} />
        </div>
      </div>
      <p className={`${classes.or} ${classes.offer}`}>or</p>

      <form className={classes.form} onSubmit={submitEmailHandler}>
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
          {showLoader ? (
            <img src={buttonloader} className={classes.loader} />
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
};

export default Email;
