import React from 'react';
import classes from './HotelItem.module.css';

const HotelItem = (props) => {
  const hotel = props.hotel;
  return (
    <div className={classes.wrapper}>
      <div className={classes.imagediv}>
        <img src={hotel.propertyImage.image.url} />
      </div>
    </div>
  );
};

export default HotelItem;
