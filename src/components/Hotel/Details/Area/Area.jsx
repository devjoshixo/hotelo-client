import React from 'react';
import classes from './Area.module.css';

const Area = (props) => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>Enjoy the area</h3>
      <div className={classes.imageWrapper}>
        <div className={classes.image}>
          <img src={props.location.staticImage.url + '&size=375x250'} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Area;
