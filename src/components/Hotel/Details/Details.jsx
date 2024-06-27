import React, { useEffect, useState } from 'react';
import Review from './Review/Review';
import Stars from './Stars';
import Amenities from './Amenities/Amenities';
import Area from './Area/Area';

const Details = (props) => {
  return (
    <div className='flex flex-row justify-between'>
      <div>
        <h1 className='font-medium text-4xl m-0 mb-2'>
          {props.hotel.summary.name}
        </h1>
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
      <div className='w-2/5'>
        <Area
          location={props.hotel.summary.location}
          nearbyPOIs={props.hotel.summary.nearbyPOIs}
        />
      </div>
    </div>
  );
};

export default Details;
