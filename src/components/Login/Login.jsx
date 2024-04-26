import React, { lazy, useContext, useEffect, useState } from 'react';
import classes from './Login.module.css';
import Email from './Email';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Password from './Existinguser/Password';
import InfoForm from './Newuser/InfoForm';
import AuthContext from '../../context/AuthContext';
import NewUser from './Newuser/NewUser';

const Login = () => {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });
  const [emailPage, setEmailPage] = useState(true);
  const history = useHistory();
  const ctx = useContext(AuthContext);

  const arrowClickHandler = () => {
    setFormDetails({ email: '', password: '', firstname: '', lastname: '' });
    if (emailPage) {
      history.goBack();
    } else {
      setEmailPage(true);
    }
  };

  const redirecting = () => {
    const { redirect } = JSON.parse(sessionStorage.getItem('redirect'));
    sessionStorage.clear();
    history.push(redirect);
  };

  const formDetailChangeHandler = (event) => {
    setFormDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className={classes.container}>
      <i
        className={`fa-solid fa-arrow-left ${classes.arrow}`}
        onClick={arrowClickHandler}
      />
      {emailPage ? (
        <Email
          onFormChange={formDetailChangeHandler}
          formDetails={formDetails}
          setEmailPage={setEmailPage}
          redirecting={redirecting}
        />
      ) : ctx.userExists ? (
        <Password
          redirecting={redirecting}
          onFormChange={formDetailChangeHandler}
          formDetails={formDetails}
        />
      ) : (
        <NewUser
          onFormChange={formDetailChangeHandler}
          formDetails={formDetails}
        />
      )}
    </div>
  );
};

export default Login;
