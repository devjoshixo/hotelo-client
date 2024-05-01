import React, { useState, useEffect, useContext } from 'react';
import QueryContext from '../../../../context/QueryContext';
import classes from './MultiSelection.module.css';
import Checkbox from '@mui/material/Checkbox';
import uniqid from 'uniqid';

const MultiSelection = (props) => {
  const [toggleHide, setToggleHide] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const ctx = useContext(QueryContext);
  const [parameter, setParameter] = useState(
    ctx.parameters[props.item.multiSelectionOptions[0].id] || []
  );

  useEffect(() => {
    if (props.item.primary != 'Popular filters') {
      if (props.item.multiSelectionOptions.length > 4) {
        setToggleHide(true);
        setShowButton(true);
      }
    }
  }, []);

  const onToggleList = () => {
    setToggleHide((prevState) => !prevState);
  };

  const checkedBox = (event, filter) => {
    console.log(parameter);
    if (event.target.checked) {
      ctx.queryAdder(filter.id, [...parameter, `${filter.value}`]);
    }
  };

  return (
    <div className={classes.checkList}>
      {props.item.multiSelectionOptions.map((filter, index) => {
        if (filter.id == 'poi') {
          return;
        }
        if (
          props.item.primary != 'Popular filters' &&
          toggleHide &&
          index > 4
        ) {
          return;
        }

        return (
          <div className={classes.checkItem} key={uniqid()}>
            <Checkbox
              onClick={() => {
                checkedBox(event, filter);
              }}
              checked={parameter.includes(filter.value)}
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

export default MultiSelection;
