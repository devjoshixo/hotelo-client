import React, { useState } from 'react';
import uniqid from 'uniqid';
import Carousel from 'react-material-ui-carousel';
import Image from './Sections/Image/Image';
import Breakfast from './Sections/Breakfast/Breakfast';
import Price from './Sections/Price/Price';
import RoomModal from './Modal/RoomModal';
import useOutsideClick from '../../../../hooks/UseOutsideClick';

const ICONS = {
  done: <i class='fa-solid fa-check'></i>,
  people: <i class='fa-solid fa-users'></i>,
  wifi: <i class='fa-solid fa-wifi'></i>,
  local_parking: <i class='fa-solid fa-car'></i>,
  dimension: <i class='fa-solid fa-chart-area'></i>,
  location_city: <i class='fa-solid fa-city'></i>,
  bed: <i class='fa-solid fa-bed'></i>,
};

const RoomItem = (props) => {
  const [breakfast, setBreakfast] = useState(0);
  const [refModal, modal, setModal] = useOutsideClick();

  const toggleBreakfast = (event) => {
    setBreakfast(event.target.value);
  };

  return (
    <div className='w-[20rem] h-[50rem] bg-[white] rounded-[20px] border flex flex-col flex-[0_0_32.333%] justify-between pb-3 border-[#64646441]'>
      <div>
        <Image room={props.room} />
        <div className='p-3 pt-2'>
          <h2 className='font-medium text-lg'>{props.room.header.text}</h2>
          <div className='flex flex-col mt-4 gap-1'>
            {props.room.features.map((feature) => {
              return (
                <div className='flex items-center gap-2' key={uniqid()}>
                  {feature.icon ? (
                    ICONS[feature.icon.id]
                  ) : (
                    <img src={feature.graphic.url.value} className='w-5 h-5' />
                  )}
                  <p>{feature.text}</p>
                </div>
              );
            })}
            <div
              className='text-[blue] text-base flex items-center gap-1 cursor-pointer'
              onClick={() => {
                setModal(true);
              }}
            >
              <p className='hover:underline '>More details</p>
              <i className='fa-solid fa-angle-right scale-[0.8]'></i>
            </div>
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
      {modal && (
        <RoomModal
          ref={refModal}
          modal={modal}
          ICONS={ICONS}
          breakfast={breakfast}
          toggleBreakfast={toggleBreakfast}
          room={props.room}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default RoomItem;
