import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import Radio from '@mui/material/Radio';
import QueryContext from '../../../../context/QueryContext';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import classes from './SelectionField.module.css';

const SelectionField = (props) => {
  const [toggleHide, setToggleHide] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const ctx = useContext(QueryContext);
  const [checkedItem, setCheckedItem] = useState(
    ctx.parameters[props.item.options[0].id]
  );

  useEffect(() => {
    setCheckedItem((prevState) => {
      let selected = props.item.options[0].value;
      const id = ctx.parameters[props.item.options[0].id];

      if (id) {
        props.item.options.map((data) => {
          if (data.value == id) {
            selected = data.value;
          }
        });
      }
      return selected;
    });
    if (props.item.options.length > 5) {
      setToggleHide(true);
      setShowButton(true);
    }
    const name = props.item.primary;
  }, []);

  const handleChange = (event) => {
    // props.queryHandler
    // event.target.value;
  };

  const onToggleList = (event) => {
    event.preventDefault();
    setToggleHide((prevState) => !prevState);
  };

  const radioButtonClick = (event, item) => {
    event.preventDefault();
    props.queryAdder(item.id, item.value);
  };
  return (
    <div className={classes.wrapper}>
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
                onClick={() => {
                  radioButtonClick(event, items);
                }}
                name={items.value}
                key={uniqid()}
              >
                <div>
                  <input
                    type='radio'
                    checked={checkedItem == items.value}
                    name={items.value}
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
