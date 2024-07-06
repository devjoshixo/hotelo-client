import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Breakfast = (props) => {
  return (
    <div className='w-full'>
      <hr className='opacity-15 mb-3 ' />
      <div className='px-4 w-full'>
        <div>
          <p className='font-sans'>Extras</p>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            value={props.breakfast}
            name='radio-buttons-group'
            onChange={props.toggleBreakfast}
          >
            <div className='flex justify-between w-full items-center'>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label={<p className='text-base'>No Extras</p>}
              />
              <p className='font-semibold text-[0.9rem]'>
                {props.details.tertiarySelections[0].price}
              </p>
            </div>
            <div className='flex justify-between w-full items-center'>
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={<p className='text-base'>Breakfast buffet</p>}
              />
              <p className='font-semibold text-[0.9rem]'>
                {props.details.tertiarySelections[1].price}
              </p>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Breakfast;
