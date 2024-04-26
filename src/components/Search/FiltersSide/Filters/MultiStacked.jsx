import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import classes from './MultiStacked.module.css';

const MultiStacked = (props) => {
  const [query, setQuery] = useState(
    props.item.tileMultiSelectionOptions[0].id
  );
  const [selected, setSelected] = useState({});

  useEffect(() => {
    let obj = [];
    for (let key in selected) {
      obj = [...obj, [key]];
    }
    if (obj.length > 0) {
      props.queryAdder(query, obj);
    }
  }, [selected]);

  const toggleSelection = (event) => {
    const name = event.target.getAttribute('name');
    setSelected((prevState) => {
      let obj = {};
      if (prevState[name]) {
        for (let key in prevState) {
          if (key == name) {
            continue;
          } else {
            obj[key] = true;
          }
        }
        return { ...obj };
      } else {
        return { ...prevState, [name]: true };
      }
    });
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
