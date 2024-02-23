import React from 'react';
import classes from './Travellers.module.css';
const Travellers = (props) => {
  return (
    <div className={classes.floatingpassenger} ref={props.passengerRef}>
      <p>Room 1</p>
      <div className={classes.adultChoice}>
        Adults
        <i
          class='fa-solid fa-minus'
          onClick={(event) => {
            props.setRooms((prevState) => {
              const newValue = prevState.travellers.adults - 1;
              console.log(newValue);
              return {
                ...prevState,
                travellers: {
                  ...prevState.travellers,
                  adults: newValue,
                },
              };
            });
          }}
        ></i>
        <p name='adults'>{props.rooms.travellers.adults}</p>
        <i
          className='fa-solid fa-plus'
          onClick={() => {
            props.rooms((prevState) => {});
          }}
        ></i>
      </div>
    </div>
  );
};

export default Travellers;
