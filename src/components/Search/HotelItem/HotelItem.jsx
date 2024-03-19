import React from 'react';
import classes from './HotelItem.module.css';

const HotelItem = (props) => {
  const hotel = props.hotel;
  return (
    <div className={classes.wrapper}>
      <div className={classes.imagediv}>
        <img src={hotel.propertyImage.image.url} />
      </div>
      <div className={classes.details}>
        <h3 className={classes.name}>{hotel.name}</h3>
        <p>{hotel.neighborhood.name}</p>
      </div>
    </div>
  );
};

export default HotelItem;
