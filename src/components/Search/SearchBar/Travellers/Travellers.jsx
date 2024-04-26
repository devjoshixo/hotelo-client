import React from 'react';
import classes from './Travellers.module.css';

const child_option = [
  'Under 1',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
];

const DEFAULT_CHILDREN = { age: 'Child' };

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
            if (item.adults == 1) {
              newAdults = 1;
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
  const changeChildrenHandler = (value) => {
    props.setRooms((prevState) => {
      const newTravellers = prevState.travellers.map((item, index) => {
        if (index == props.index - 1) {
          let newChildren = item.children;
          if (value > 0) {
            if (item.children.length < 6) {
              newChildren.push({ age: 0 });
            }
          } else {
            if (item.children.length > 0) {
              newChildren = newChildren.slice(0, -1);
            }
          }
          return { ...item, children: newChildren };
        }
        return item;
      });
      return { ...prevState, travellers: newTravellers };
    });
  };

  const fillSelectedValue = (event) => {
    props.setRooms((prevState) => {
      const newTravellers = prevState.travellers.map((item, index) => {
        if (index == props.index - 1) {
          const newChildren = item.children.map((child, childIndex) => {
            let newChild = child;
            if (childIndex == event.target.name) {
              newChild = { age: event.target.value };
            }
            return newChild;
          });
          return { ...item, children: newChildren };
        }
        return item;
      });
      return { ...prevState, travellers: newTravellers };
    });
  };

  const removeRoom = () => {
    props.setRooms((prevState) => {
      const newTravellers = prevState.travellers.filter((item, index) => {
        if (index == props.index - 1) {
        } else {
          return item;
        }
      });

      return { ...prevState, travellers: newTravellers };
    });
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
          <input type='text' value={props.rooms.adults} />
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
            onClick={() => {
              changeChildrenHandler(-1);
            }}
          >
            <i className='fa-solid fa-minus' />
          </div>
          <input type='text' value={props.rooms.children.length} />
          <div
            className={`${classes.icon} ${
              props.rooms.children.length > 5 ? classes.hidden : ''
            }`}
            onClick={() => {
              changeChildrenHandler(1);
            }}
          >
            <i className='fa-solid fa-plus' />
          </div>
        </div>
      </div>
      {props.rooms.children.length > 0 ? (
        <div className={classes.childrenbox}>
          {props.rooms.children.map((child, index) => {
            return (
              <select
                className={classes.ageselector}
                key={index}
                name={index}
                value={child.age}
                onChange={fillSelectedValue}
              >
                <option value={0} selected disabled hidden>
                  Child {index + 1} age
                </option>
                {child_option.map((age) => {
                  return (
                    <option value={age} key={age}>
                      {age}
                    </option>
                  );
                })}
              </select>
            );
          })}
        </div>
      ) : (
        ''
      )}
      {/* Children Section Ends  */}
      {/*  */}

      {props.totalRooms > 1 ? (
        <div className={classes.remove} onClick={removeRoom}>
          <div>Remove room</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Travellers;
