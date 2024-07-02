import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Modal from './Modal/Modal';

const Amenities = (props) => {
  const ICONS = {
    pool: <i className='fa-solid fa-person-swimming fa-flip-horizontal'></i>,
    spa: <i className='fa-solid fa-spa'></i>,
    wifi: <i className='fa-solid fa-wifi'></i>,
    local_parking: <i className='fa-solid fa-car'></i>,
    local_laundry_service: <i className='fa-solid fa-shirt'></i>,
    local_dining: <i className='fa-solid fa-utensils'></i>,
    local_bar: <i className='fa-solid fa-wine-glass'></i>,
    fitness_center: <i className='fa-solid fa-dumbbell'></i>,
    airport_shuttle: <i className='fa-solid fa-bus'></i>,
    ac_unit: <i className='fa-regular fa-snowflake'></i>,
    child_friendly: <i className='fa-regular fa-face-smile'></i>,
    local_convenience_store: <i className='fa-solid fa-square-h'></i>,
  };

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = modal ? 'hidden' : 'auto';
  }, [modal]);

  const onToggle = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <div>
      <h3 className='font-medium m-0 mt-4'>Popular Amenities</h3>
      <div className='flex flex-col flex-wrap basis-1/2 h-28'>
        {props.amenities.topAmenities.items.map((item, index) => {
          return (
            <div
              className='flex gap-3 items-center h-9 w-48 text-base'
              key={uniqid()}
            >
              {ICONS[item.icon.id]}
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
      <p
        className='m-0 text-[#1668e3] text-[0.9rem] cursor-pointer hover:underline'
        onClick={onToggle}
      >
        See all property amenities {' >'}{' '}
      </p>

      {modal && (
        <Modal
          onToggle={onToggle}
          amenities={props.amenities}
          title={props.title}
          ICONS={ICONS}
        />
      )}
    </div>
  );
};

export default Amenities;
