import React, { useContext } from 'react';
import classes from './Password.module.css';
import AuthContext from '../../../context/AuthContext';
import useLogin from '../../../hooks/UseLogin';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Password = (props) => {
  const ctx = useContext(AuthContext);
  const { error, login } = useLogin();
  const history = useHistory();

  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const submitEmailHandler = async (event) => {
    event.preventDefault();
    const done = await login(props.formDetails);

    if (done) {
      history.push('/');
    }
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
      <button className={classes.action}>Continue</button>
    </form>
  );
};

export default Password;
