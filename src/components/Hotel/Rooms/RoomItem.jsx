import React, { useState } from 'react';

const RoomItem = (props) => {
  const [imageId, setImageId] = useState(0);
  const galleryLength =
    props.room.primarySelections[0].propertyUnit.unitGallery.gallery.length;

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
    <div className='w-[21rem] h-[40rem] bg-[white] rounded-[10px] border border-[#64646441]'>
      <div className='relative'>
        <i
          name='left'
          onClick={() => {
            changeImageHandler(-1);
          }}
          className='fa-solid fa-chevron-left top-[40%] left-[2%] text-[blue] hover:bg-[#e2e2fa] bg-[white] absolute w-[2.5rem] h-[2.5rem] text-center rounded-[50%] pt-3'
        ></i>
        <img
          src={
            props.room.primarySelections[0].propertyUnit.unitGallery.gallery[
              imageId
            ].image.url
          }
          className='w-full h-full rounded-t-[10px]'
        />
        <i
          name='right'
          onClick={() => {
            changeImageHandler(1);
          }}
          className='fa-solid fa-chevron-right top-[40%] left-[85%] text-[blue] hover:bg-[#e2e2fa] bg-[white] absolute w-[2.5rem] h-[2.5rem] text-center rounded-[50%] pt-3'
        ></i>
        <div className='absolute top-[76%] right-3 w-[6rem] h-11 gap-2 rounded-[20px] text-[white] bg-[#241829a8] hover:bg-[#241829bd] flex items-center justify-center cursor-pointer'>
          <i className='fa-regular fa-images scale-110'></i>
          <p className='text-xl font-bold'>{galleryLength}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
