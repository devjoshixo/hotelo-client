import React from 'react';
import classes from './MultiSelection.module.css';
import Checkbox from '@mui/material/Checkbox';

const MultiSelection = (props) => {
  console.log(props.item);
  return (
    <div className={classes.checkList}>
      {props.item.multiSelectionOptions.map((filter) => {
        return (
          <div className={classes.checkItem}>
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
    </div>
  );
};

export default MultiSelection;
