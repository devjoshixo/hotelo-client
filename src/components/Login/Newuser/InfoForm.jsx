import React, { useState } from 'react';
import classes from './InfoForm.module.css';

const InfoForm = (props) => {
  const [error, setError] = useState({});
  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    checkError();

    if (isObjectEmpty(error)) {
      props.setNext(true);
    }
  };

  const checkError = () => {
    let err = {};
    if (props.formDetails.firstname.trim() == '') {
      err.firstname = 'Please enter your first name';
    }
    if (props.formDetails.lastname.trim() == '') {
      err.lastname = 'Please enter your last name';
    }
    setError(err);
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <h4 className={classes.heading}>
        What name do you use on your travel ID?
      </h4>
      <p className={classes.subtext}>
        Match your account name to the ID you use when travelling, like a
        passport or licence. We'll have it ready next time you book.
      </p>
      <input
        type='text'
        className={classes.input}
        name='firstname'
        placeholder='First Name'
        onChange={formDetailChangeHandler}
      />
      <p className={classes.error}>{error.firstname}</p>
      <input
        type='text'
        className={classes.input}
        name='lastname'
        placeholder='Last Name'
        onChange={formDetailChangeHandler}
      />
      <p className={classes.error}>{error.lastname}</p>
      <button className={classes.action}>Continue</button>
    </form>
  );
};

export default InfoForm;
