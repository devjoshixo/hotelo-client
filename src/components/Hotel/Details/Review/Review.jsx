import React, { useEffect, useState } from 'react';

const Review = (props) => {
  const [review, setReview] = useState('Loading');
  useEffect(() => {
    setReview(() => {
      const splitted = props.review.split('/');
      return [splitted[0], splitted[1].split(' ')[1]];
    });
  }, []);
  return (
    <div className='flex items-center gap-2'>
      <div className='w-[1.9rem] rounded-[5px] h-[1.3rem] p-[0.3rem] text-[white] text-center bg-[green]'>
        {review[0]}
      </div>
      <p className='m-0'>{review[1]}</p>
    </div>
  );
};

export default Review;
