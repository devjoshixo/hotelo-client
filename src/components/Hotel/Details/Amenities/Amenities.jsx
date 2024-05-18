import React, { useState, useEffect } from 'react';
import classes from './Amenities.module.css';
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
      <h3 className={classes.header}>Popular Amenities</h3>
      <div className={classes.bodywrapper}>
        {props.amenities.takeover.highlight[0].items.map((item, index) => {
          if (index > 5) return;

          return (
            <div className={classes.amenities} key={uniqid()}>
              {ICONS[item.icon.id]}
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
      <p className={classes.link} onClick={onToggle}>
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
