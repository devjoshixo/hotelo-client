import React from 'react';
import classes from './Hotelo.module.css';
import logo from '../../assets/hotel-solid.svg';

const HoteloLoader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.heading}>
          {/* <i className={`fa-solid fa-hotel ` + classes.icon}></i> */}
          <div className={classes.icon}>
            <img src={logo} alt='' className={classes.icon} />
          </div>
          <h2 className={classes.heading}>Hotelo</h2>
          <p className={classes.com}>.com</p>
        </div>
        <div className={classes.loader}></div>
      </div>
    </div>
  );
};

export default HoteloLoader;
