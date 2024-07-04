import React, { useState } from 'react';

const Image = (props) => {
  const [imageId, setImageId] = useState(0);
  const galleryLength = props.image.length;

  const changeImageHandler = (value) => {
    let newValue = value;
    let operate = true;

    if (value == 1) {
      if (imageId == galleryLength - 1) {
        newValue = 0;
        operate = false;
      }
    } else if (value == -1) {
      if (imageId == 0) {
        newValue = galleryLength - 1;
        operate = false;
      }
    }
    setImageId((prevState) => {
      if (operate) {
        return prevState + newValue;
      } else {
        return newValue;
      }
    });
  };

  return (
    <div className='relative cursor-pointer'>
      <i
        name='left'
        onClick={() => {
          changeImageHandler(-1);
        }}
        className='fa-solid fa-chevron-left top-[40%] left-[2%] text-[blue] hover:bg-[#e2e2fa] bg-[white] absolute w-[2rem] h-[2rem] text-center rounded-[50%] pt-2'
      ></i>
      <div className='object-contain'>
        <img
          src={props.image[imageId].image.url}
          className='w-full h-full rounded-t-[10px]'
        />
      </div>
      <i
        name='right'
        onClick={() => {
          changeImageHandler(1);
        }}
        className='fa-solid fa-chevron-right top-[40%] left-[85%] text-[blue] hover:bg-[#e2e2fa] bg-[white] absolute w-[2rem] h-[2rem] text-center rounded-[50%] pt-2'
      ></i>
      <div className='absolute top-[76%] right-3 w-[6rem] h-11 gap-2 rounded-[20px] text-[white] bg-[#241829a8] hover:bg-[#241829bd] flex items-center justify-center cursor-pointer'>
        <i className='fa-regular fa-images scale-110'></i>
        <p className='text-xl font-bold'>{galleryLength}</p>
      </div>
    </div>
  );
};

export default Image;
