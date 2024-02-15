import React from 'react';
import classes from './Banner.module.css';

const Banner = () => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>Find and book your perfect stay</h3>
      <div className={classes.box}>
        <i className={`fa-solid fa-moon ${classes.icon}`}></i>
        <p>Earn rewards on every night you stay</p>
      </div>
      <div className={classes.box}>
        <i className={`fa-solid fa-tag ${classes.icon}`}></i>
        <p>Save more with Member Prices</p>
      </div>
      <div className={classes.box}>
        <i className={`fa-solid fa-calendar-days ${classes.icon}`}></i>
        <p>Free cancellation options if plans change</p>
      </div>
    </div>
  );
};

export default Banner;
