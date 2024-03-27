import React from 'react';
import classes from './Hotelo.module.css';

const HoteloLoader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.heading}>
          <i className={`fa-solid fa-hotel ` + classes.icon}></i>
          <h1 className={classes.heading}>Hotelo</h1>
          <p className={classes.com}>.com</p>
        </div>
        <div className={classes.loader}></div>
      </div>
    </div>
  );
};

export default HoteloLoader;
