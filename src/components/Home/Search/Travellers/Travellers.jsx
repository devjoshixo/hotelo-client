import React from 'react';

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
              newChildren.push({ age: -1 });
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
    <div className='flex flex-col gap-0 py-4 px-0 border-b'>
      <p className='m-0 text-[0.9rem]'>Room {props.index}</p>
      {/*  */}
      {/* Adult Selection Row */}
      <div className='flex items-center justify-between gap-4'>
        <h4 className='m-0 text-[0.9rem]'>Adults</h4>
        <div className='flex items-center justify-evenly gap-4 mb-4'>
          <div
            className={`border-action-input border rounded-[50%] flex w-8 h-8 items-center justify-center ${
              props.rooms.adults > 1 ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => {
              changeAdultHandler(-1);
            }}
          >
            <i className='fa-solid fa-minus scale-[0.6]' />
          </div>
          {/* <div>{props.rooms.adults}</div> */}
          <input
            type='text'
            className='pointer-events-none bg-[white] text-[black] text-[0.9rem] text-center w-4 border-none'
            value={props.rooms.adults}
          />
          <div
            className={`border border-action-input rounded-[50%] flex w-8 h-8 justify-center items-center ${
              props.rooms.adults > 13 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={() => {
              changeAdultHandler(1);
            }}
          >
            <i className='fa-solid fa-plus scale-[0.6]' />
          </div>
        </div>
      </div>
      {/* Adult Row Ends */}
      {/*  */}

      {/*  */}
      {/* Children Row Section */}
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h4 className='m-0 text-[0.9rem]'>Children</h4>
          <p className='m-0 text-[0.9rem]'>Ages 0 to 17</p>
        </div>
        <div className='flex items-center justify-evenly gap-4 mb-4'>
          <div
            className={`border-action-input border rounded-[50%] flex w-8 h-8 items-center justify-center ${
              props.rooms.children.length < 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => {
              changeChildrenHandler(-1);
            }}
          >
            <i className='fa-solid fa-minus scale-[0.6]' />
          </div>
          <input
            type='text'
            className='pointer-events-none bg-[white] text-[black] text-[0.9rem] text-center w-4 border-none'
            value={props.rooms.children.length}
          />
          <div
            className={`border-action-input border rounded-[50%] flex w-8 h-8 items-center justify-center ${
              props.rooms.children.length > 5
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => {
              changeChildrenHandler(1);
            }}
          >
            <i className='fa-solid fa-plus scale-[0.6]' />
          </div>
        </div>
      </div>
      {props.rooms.children.length > 0 ? (
        <div className='flex flex-row flex-wrap w-[17rem] min-h-12 gap-2 justify-between'>
          {props.rooms.children.map((child, index) => {
            return (
              <select
                className='w-32 h-12 text-[1rem] text-center cursor-pointer rounded-[20px] bg-[white] text-[black] border'
                key={index}
                name={index}
                value={child.age}
                onChange={fillSelectedValue}
              >
                <option value={-1} selected disabled hidden>
                  Child {index + 1} age
                </option>
                {child_option.map((age, ageIndex) => {
                  let value = age;
                  if (ageIndex == 0) value = 0;
                  return (
                    <option value={value} key={age}>
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
        <div className='flex justify-end mt-[0.3rem]' onClick={removeRoom}>
          <div className='rounded-[20px] flex text-[#1a59b8] font-bold justify-center items-center w-[11rem] h-8 hover:bg-[#1668e32b] hover:text-[#094196]'>
            Remove room
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Travellers;
