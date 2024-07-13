import React, { useState } from 'react';
import uniqid from 'uniqid';
import RoomItem from './RoomItem/RoomItem';

const Rooms = (props) => {
  let length = props.rooms.categorizedListings.length;
  const images = props.rooms.categorizedListings.filter((room) => {
    return (
      room.primarySelections[0].propertyUnit.unitGallery.gallery.length > 1
    );
  });
  return (
    <div className='w-full mt-8'>
      <h2 className='text-4xl font-medium'>Choose your room</h2>
      <p>
        Showing {images.length} of {images.length} rooms
      </p>
      <div className='flex justify-center items-center'>
        <div className='w-full mt-8 flex gap-2 justify-start items-center flex-wrap'>
          {images.map((room, index) => {
            // if (index > 0) return;
            return <RoomItem room={room} key={uniqid()} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
