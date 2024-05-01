import React, { useEffect, useState, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import classes from './MultiTile.module.css';
import uniqid from 'uniqid';
import QueryContext from '../../../../context/QueryContext';

const MultiTile = (props) => {
  const [toggleHide, setToggleHide] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const ctx = useContext(QueryContext);
  const [selected, setSelected] = useState(
    ctx.parameters[props.item.tileMultiSelectionOptions[0].id] || []
  );

  useEffect(() => {
    if (props.item.primary != 'Popular filters') {
      if (props.item.tileMultiSelectionOptions.length > 4) {
        setToggleHide(true);
        setShowButton(true);
      }
    }
  }, []);

  const onToggleList = () => {
    setToggleHide((prevState) => !prevState);
  };

  const checkedBox = (event, filter) => {
    if (event.target.checked) {
      ctx.queryAdder(filter.id, [...selected, `${filter.value}`]);
    } else {
      const obj = selected.filter((item) => {
        if (item == filter.value) {
        } else {
          return item;
        }
      });
      if (obj.length == 0) {
        ctx.queryDelete(filter.id);
        return;
      }
      ctx.queryAdder(filter.id, obj);
    }
  };
  return (
    <div className={classes.checkList}>
      {props.item.tileMultiSelectionOptions.map((filter, index) => {
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
              checked={selected.includes(filter.value)}
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
