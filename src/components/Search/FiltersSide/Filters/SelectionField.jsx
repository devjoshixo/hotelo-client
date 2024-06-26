import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import Radio from '@mui/material/Radio';
import QueryContext from '../../../../context/QueryContext';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
    <div className='mt-2'>
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
                className='text-[0.9rem] font-normal m-0 flex mb-[0.8rem]'
                onClick={() => {
                  radioButtonClick(event, items);
                }}
                name={items.value}
                key={uniqid()}
              >
                <div>
                  <input
                    type='radio'
                    className='scale-[1.6] mr-[0.6rem]'
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
          <div
            className='bg-[white] border-none text-[blue] text-[0.9rem font-[Arial, Helvetica, sans-serif] ml-4 hover:underline'
            onClick={onToggleList}
          >
            {toggleHide ? 'See more' : 'Hide'}
          </div>
        )}
      </FormControl>
    </div>
  );
};

export default SelectionField;
