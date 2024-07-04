import React from 'react';
import uniqid from 'uniqid';
import RoomItem from './RoomItem';

const Rooms = (props) => {
  const length = props.rooms.categorizedListings.length;
  return (
    <div className='w-full'>
      <h2 className='text-4xl font-medium'>Choose your room</h2>
      <p>
        Showing {length} of {length} rooms
      </p>
      <div className='flex justify-center'>
        <div className='w-full mt-20 flex gap-2 justify-center items-center flex-wrap'>
          {props.rooms.categorizedListings.map((room) => {
            return <RoomItem room={room} key={uniqid()} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
