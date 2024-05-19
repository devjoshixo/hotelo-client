import React, { useEffect, useState } from 'react';
import Review from './Review/Review';
import classes from './Details.module.css';
import Stars from './Stars';
import Amenities from './Amenities/Amenities';
import Area from './Area/Area';

const Details = (props) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.title}>{props.hotel.summary.name}</h1>
        <Stars
          starRating={props.hotel.summary.overview.propertyRating.rating}
        />
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
      <div style={{ width: '40%' }}>
        <Area
          location={props.hotel.summary.location}
          poi={props.hotel.summary.nearbyPOIs}
        />
      </div>
    </div>
  );
};

export default Details;
