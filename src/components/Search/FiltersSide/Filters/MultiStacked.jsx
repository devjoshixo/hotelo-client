import React, { useState } from 'react';
import uniqid from 'uniqid';
import classes from './MultiStacked.module.css';

const MultiStacked = (props) => {
  const [query, setQuery] = useState(
    props.item.tileMultiSelectionOptions[0].id
  );
  const [selected, setSelected] = useState({});

  const toggleSelection = (event) => {
    const name = event.target.getAttribute('name');
    let flag = true;
    setSelected((prevState) => {
      let obj = prevState;
      if (obj[name]) {
        delete obj[name];
        flag = false;
        return { ...obj };
      } else {
        return { ...obj, [name]: true };
      }
    });

    if (flag) {
      console.log(selected);
      let obj = [];
      for (let keys in selected) {
        console.log(keys);
        console.log('first');
        obj.push(keys);
      }
      // props.queryAdder(query, obj);
    }
  };

  return (
    <div className={classes.wrapper}>
      {props.item.tileMultiSelectionOptions.map((item) => {
        return (
          <div
            className={`${classes.box} ${
              selected[item.primary] ? classes.selected : ''
            }`}
            key={uniqid()}
            name={item.primary}
            onClick={toggleSelection}
          >
            {item.primary}
            {item.icon.id == 'star' ? (
              <i
                className='fa-solid fa-star'
                name={item.primary}
                style={{ transform: 'scale(0.8)' }}
              ></i>
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiStacked;
