import React, { useContext, useState } from 'react';
import classes from './Password.module.css';
import AuthContext from '../../../context/AuthContext';
import useLogin from '../../../hooks/UseLogin';
import { useHistory } from 'react-router-dom';
import buttonloader from '../../../assets/infinite-spinner.svg';

const Password = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const ctx = useContext(AuthContext);
  const { error, login } = useLogin();
  const history = useHistory();

  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const submitEmailHandler = async (event) => {
    event.preventDefault();
    setShowLoader(true);
    const done = await login(props.formDetails);

    if (done) {
      props.redirecting();
    }
    setShowLoader(false);
  };
  return (
    <form className={classes.form} onSubmit={submitEmailHandler}>
      <h4 className={classes.heading}>Enter your password</h4>
      <div className={classes.email}>
        <label>Email</label>
        <p>{props.formDetails.email}</p>
      </div>
      <input
        type='password'
        placeholder='Password'
        name='password'
        className={classes.password}
        onChange={formDetailChangeHandler}
      />
      <button className={classes.action}>
        {showLoader ? (
          <img src={buttonloader} className={classes.loader} />
        ) : (
          ' Continue'
        )}
      </button>
    </form>
  );
};

export default Password;
