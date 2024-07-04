import React, { useState } from 'react';
import Image from './Sections/Image';

const RoomItem = (props) => {
  return (
    <div className='w-[19rem] h-[50rem] bg-[white] rounded-[10px] border border-[#64646441]'>
      <Image
        image={props.room.primarySelections[0].propertyUnit.unitGallery.gallery}
      />
      <div>
        <h2>{props.room.header.text}</h2>
      </div>
    </div>
  );
};

export default RoomItem;
