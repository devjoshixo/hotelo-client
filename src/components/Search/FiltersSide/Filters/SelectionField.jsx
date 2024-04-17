import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import classes from './SelectionField.module.css';

const SelectionField = (props) => {
  const [toggleHide, setToggleHide] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [queryName, setQueryName] = useState('');
  const [checkedItem, setCheckedItem] = useState(props.item.options[0].primary);

  useEffect(() => {
    if (props.item.options.length > 5) {
      setToggleHide(true);
      setShowButton(true);
    }
    const name = props.item.primary;
    if ('Guest rating' == name) {
      setQueryName('guestRating');
    } else if ('Area' == name) {
      setQueryName(name);
    }
  }, []);

  const handleChange = (event) => {
    // props.queryHandler
    // event.target.value;
  };

  const onToggleList = (event) => {
    event.preventDefault();
    setToggleHide((prevState) => !prevState);
  };

  const radioButtonClick = (event) => {
    event.preventDefault();
    setCheckedItem(event.target.getAttribute('name'));
  };
  return (
    <div className={classes.wrapper}>
      {' '}
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          defaultValue={props.item.options[0].primary}
          // value={value}
          sx={{ fontSize: '1rem' }}
          onChange={handleChange}
        >
          {props.item.options.map((items, index) => {
            if (index > 4 && toggleHide) {
              return;
            }
            return (
              <div
                className={classes.radio}
                onClick={radioButtonClick}
                name={items.primary}
                key={uniqid()}
              >
                <div>
                  <input
                    type='radio'
                    checked={checkedItem == items.primary}
                    name={items.primary}
                    readOnly
                  />
                </div>
                {items.primary}
              </div>
            );
          })}

          {/* <FormControlLabel value='male' control={<Radio />} label='Male' /> */}
        </RadioGroup>
        {showButton && (
          <div className={classes.buttonText} onClick={onToggleList}>
            {toggleHide ? 'See more' : 'Hide'}
          </div>
        )}
      </FormControl>
    </div>
  );
};

export default SelectionField;
