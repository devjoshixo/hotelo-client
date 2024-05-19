import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import classes from './Area.module.css';

const Area = (props) => {
  const [crop, setCrop] = useState({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>Enjoy the area</h3>
      <div className={classes.imageWrapper}>
        <div className={classes.image}>
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img src={props.location.staticImage.url} alt='' />
          </ReactCrop>
        </div>
      </div>
    </div>
  );
};

export default Area;
