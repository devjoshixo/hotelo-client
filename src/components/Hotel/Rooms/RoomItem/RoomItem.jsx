import React, { useState } from 'react';
import Image from './Sections/Image';

const RoomItem = (props) => {
  return (
    <div className='w-[20rem] h-[50rem] bg-[white] rounded-[20px] border border-[#64646441]'>
      <Image
        image={props.room.primarySelections[0].propertyUnit.unitGallery.gallery}
      />
      <div className='pl-3 pt-2'>
        <h2 className='font-medium text-lg'>{props.room.header.text}</h2>
        <div className='flex flex-col mt-4 gap-3'>
          {props.room.features.map((feature) => {
            return <p>{feature.text}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
