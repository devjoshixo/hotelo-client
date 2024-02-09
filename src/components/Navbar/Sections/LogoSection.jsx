import React from 'react';
import classes from './LogoSection.module.css';
import { useHistory } from 'react-router-dom';

const LogoSection = () => {
  const navigation = useHistory();

  const redirectHome = () => {
    navigation.push('/');
  };
  return (
    <div className={classes.heading} onClick={redirectHome}>
      <i className={`fa-solid fa-hotel ` + classes.icon}></i>
      <h1 className={classes.heading}>Hotelo</h1>
      <p className={classes.com}>.com</p>
    </div>
  );
};

export default LogoSection;
