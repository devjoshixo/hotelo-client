import React from 'react';
import classes from './MultiStacked.module.css';

const MultiStacked = (props) => {
  // console.log(props.item.tileMultiSelectionOptions);
  return (
    <div className={classes.wrapper}>
      {props.item.tileMultiSelectionOptions.map((item) => {
        return (
          <div className={classes.box}>
            {item.primary}
            {item.icon.id == 'star' ? (
              <i
                className='fa-solid fa-star'
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
