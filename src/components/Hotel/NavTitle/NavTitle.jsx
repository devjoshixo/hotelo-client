import React, { useState } from 'react';
import classes from './NavTitle.module.css';

const NavTitle = () => {
  const headings = [
    'Overview',
    'Amenities',
    'Rooms',
    'Accessibility',
    'Policies',
  ];

  const [selected, setSelected] = useState(headings[0]);

  const toggleSelected = (event) => {
    const name = event.target.getAttribute('name');
    setSelected(name);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.optionwrapper}>
        {headings.map((item, index) => {
          return (
            <div
              className={`${classes.option} ${
                selected == item ? classes.selected : ''
              }`}
              name={item}
              onClick={toggleSelected}
            >
              {item}
            </div>
          );
        })}
      </div>
      <button className={classes.button}>Reserve a room</button>
    </div>
  );
};

export default NavTitle;
