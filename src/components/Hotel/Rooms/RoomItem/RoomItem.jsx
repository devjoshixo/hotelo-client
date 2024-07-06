import React, { useState } from 'react';
import uniqid from 'uniqid';
import Carousel from 'react-material-ui-carousel';
import Image from './Sections/Image/Image';
import Breakfast from './Sections/Breakfast/Breakfast';
import Price from './Sections/Price/Price';

const RoomItem = (props) => {
  const [breakfast, setBreakfast] = useState(0);

  const toggleBreakfast = (event) => {
    setBreakfast(event.target.value);
  };
  console.log(breakfast);
  console.log(!breakfast == true ? '1' : '0');

  return (
    <div className='w-[20rem] h-[50rem] bg-[white] rounded-[20px] border flex flex-col justify-between pb-3 border-[#64646441]'>
      <div>
        <Image room={props.room} />
        <div className='p-3 pt-2'>
          <h2 className='font-medium text-lg'>{props.room.header.text}</h2>
          <div className='flex flex-col mt-4 gap-1'>
            {props.room.features.map((feature) => {
              return (
                <div key={uniqid()}>
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        {props.room.primarySelections[0].secondarySelections ? (
          <Breakfast
            details={props.room.primarySelections[0].secondarySelections[0]}
            toggleBreakfast={toggleBreakfast}
            breakfast={breakfast}
          />
        ) : (
          ''
        )}
      </div>
      <Price
        prices={
          props.room.primarySelections[0].propertyUnit.ratePlans[breakfast]
        }
      />
    </div>
  );
};

export default RoomItem;
