import React, { useEffect, useState } from 'react';
import classes from './Review.module.css';

const Review = (props) => {
  const [review, setReview] = useState('Loading');
  useEffect(() => {
    setReview(() => {
      const splitted = props.review.split('/');
      return [splitted[0], splitted[1].split(' ')[1]];
    });
  }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className={classes.ratingbox}>{review[0]}</div>
      <p>{review[1]}</p>
    </div>
  );
};

export default Review;
