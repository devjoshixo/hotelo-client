import React, { useEffect, useState } from 'react';
import Review from './Review/Review';
import classes from './Details.module.css';
import Stars from './Stars';
import Amenities from './Amenities/Amenities';

const Details = (props) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>{props.hotel.summary.name}</h1>
      <Stars starRating={props.hotel.summary.overview.propertyRating.rating} />
      <p>{props.hotel.summary.tagline}</p>
      <Review
        review={
          props.hotel.reviewInfo.summary.overallScoreWithDescriptionA11y.value
        }
      />
      <Amenities
        amenities={props.hotel.summary.amenities}
        title={props.hotel.summary.name}
      />
    </div>
  );
};

export default Details;
