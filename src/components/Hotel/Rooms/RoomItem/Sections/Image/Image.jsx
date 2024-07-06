import React, { useState } from 'react';
import uniqid from 'uniqid';
import Carousel from 'react-material-ui-carousel';

const Image = (props) => {
  const galleryLength =
    props.room.primarySelections[0].propertyUnit.unitGallery.gallery.length;

  return (
    <div className='relative'>
      <Carousel
        animate='slide'
        interval={null}
        indicators={false}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: 'white',
            color: 'blue',
          },
        }}
        sx={{ cursor: 'pointer ' }}
      >
        {props.room.primarySelections[0].propertyUnit.unitGallery.gallery.map(
          (imgUrl) => {
            return (
              <img
                src={imgUrl.image.url}
                className='w-full h-full rounded-t-[10px] '
                key={uniqid()}
              />
            );
          }
        )}
      </Carousel>
      <div className='absolute z-[999] top-[75%] right-3 w-[5rem] h-10 gap-2 rounded-[20px] text-[white] bg-[#241829a8] hover:bg-[#241829bd] flex items-center justify-center cursor-pointer'>
        <i className='fa-regular fa-images scale-110'></i>
        <p className='text-lg font-bold'>{galleryLength}</p>
      </div>
    </div>
  );
};

export default Image;
