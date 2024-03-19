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
        <div>
          <h3 className={classes.name}>{hotel.name}</h3>
          <p className={classes.district}>{hotel.neighborhood.name}</p>
        </div>
        <div>
          <div className={classes.rating}>
            <div className={classes.ratingbox}>{hotel.reviews.score}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
