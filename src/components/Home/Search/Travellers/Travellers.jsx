import React from 'react';
import classes from './Travellers.module.css';
const Travellers = (props) => {
  //
  //Changing the number of adults in the room according the icon selected
  const changeAdultHandler = (value) => {
    props.setRooms((prevState) => {
      const newTravellers = prevState.travellers.map((item, index) => {
        if (index == props.index - 1) {
          let newAdults;
          if (value > 0) {
            if (item.adults == 14) {
              newAdults = 14;
            } else {
              newAdults = item.adults + 1;
            }
          } else {
            if (item.adults == 0) {
              newAdults = 0;
            } else {
              newAdults = item.adults - 1;
            }
          }
          return { ...item, adults: newAdults };
        }
        return item;
      });
      return {
        ...prevState,
        travellers: newTravellers,
      };
    });
  };

  //
  //Changing the number of children in the room according the icon selected
  const changeChildrenHandler = () => {
    console.log('first');
  };

  return (
    <div className={classes.wrapper}>
      <p className={classes.heading}>Room {props.index}</p>
      {/*  */}
      {/* Adult Selection Row */}
      <div className={classes.row}>
        <h4 className={classes.heading}>Adults</h4>
        <div className={classes.switch}>
          <div
            className={`${classes.icon} ${
              props.rooms.adults > 1 ? '' : classes.hidden
            }`}
            onClick={() => {
              changeAdultHandler(-1);
            }}
          >
            <i className={`fa-solid fa-minus`} />
          </div>
          {/* <div>{props.rooms.adults}</div> */}
          <input type='text' placeholder={props.rooms.adults} readOnly={true} />
          <div
            className={`${classes.icon} ${
              props.rooms.adults > 13 ? classes.hidden : ''
            }`}
            onClick={() => {
              changeAdultHandler(1);
            }}
          >
            <i className={`fa-solid fa-plus`} />
          </div>
        </div>
      </div>
      {/* Adult Row Ends */}
      {/*  */}

      {/*  */}
      {/* Children Row Section */}
      <div className={classes.row}>
        <div>
          <h4 className={classes.heading}>Children</h4>
          <p className={classes.heading}>Ages 0 to 17</p>
        </div>
        <div className={classes.switch}>
          <div
            className={`${classes.icon} ${
              props.rooms.children.length < 1 ? classes.hidden : ''
            }`}
          >
            <i className='fa-solid fa-minus' />
          </div>
          <input
            type='text'
            value={props.rooms.children.length}
            readOnly={true}
          />
          <div
            className={`${classes.icon} ${
              props.rooms.children.length > 5 ? classes.hidden : ''
            }`}
          >
            <i className='fa-solid fa-plus' />
          </div>
        </div>
      </div>
      {/* Children Section Ends  */}
      {/*  */}
    </div>
  );
};

export default Travellers;
