import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import classes from './MultiTile.module.css';
import uniqid from 'uniqid';

const MultiTile = (props) => {
  const [toggleHide, setToggleHide] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (props.item.tileMultiSelectionOptions.length > 4) {
      setToggleHide(true);
      setShowButton(true);
    }
  }, []);

  const onToggleList = () => {
    setToggleHide((prevState) => !prevState);
  };
  return (
    <div className={classes.checkList}>
      {props.item.tileMultiSelectionOptions.map((filter, index) => {
        if (index > 2 && toggleHide) {
          return;
        }
        return (
          <div className={classes.checkItem} key={uniqid()}>
            <Checkbox
              sx={{
                backgroundColor: 'white',
                padding: '9px 0',
                paddingRight: '3px',
                '& .MuiSvgIcon-root': { fontSize: 23 },
              }}
            />
            <p>{filter.primary}</p>
          </div>
        );
      })}
      {showButton && (
        <div className={classes.buttonText} onClick={onToggleList}>
          {toggleHide ? 'See more' : 'Hide'}
        </div>
      )}
    </div>
  );
};

export default MultiTile;
