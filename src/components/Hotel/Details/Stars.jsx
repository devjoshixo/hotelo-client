import React from 'react';
import uniqid from 'uniqid';

const Stars = (props) => {
  const stars = props.starRating;
  const isDecimal = stars % 1;
  const starsInt = parseInt(stars);
  let starsList = [];
  for (let i = 1; i <= starsInt; i++) {
    starsList.push(
      <i
        className='fa-solid fa-star'
        style={{ color: '#4D5167', transform: 'scale(0.9)' }}
        key={uniqid()}
      />
    );
    if (starsInt === i) {
      if (!!isDecimal) {
        starsList.push(
          <i
            className='fa-solid fa-star-half'
            style={{ color: '#4D5167', transform: 'scale(0.9)' }}
            key={uniqid()}
          />
        );
      }
    }
  }
  if (stars == 4) {
    starsList.push(
      <i
        className='fa-regular fa-star'
        style={{ color: '#000000' }}
        key={uniqid()}
      />
    );
  } else {
    for (let i = starsInt + 1; i < 5; i++) {
      starsList.push(
        <i
          className='fa-solid fa-star'
          style={{ color: '#000000' }}
          key={uniqid()}
        />
      );
    }
  }
  return starsList;
};

export default Stars;
