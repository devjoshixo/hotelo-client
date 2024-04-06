import React from 'react';
import classes from './FilterBar.module.css';

const FilterBar = (props) => {
  return (
    <div className={classes.filterbar}>
      <p className='tw-text-lg'>{props.length} properties</p>
      <section>
        <select className={classes.filterselect}>
          <option value='RECOMMENDED'>Recommended</option>
          <option value='PRICE_LOW_TO_HIGH'>Price: low to high</option>
          <option value='PRICE_HIGH_TO_LOW'>Price: high to low</option>
          <option value='REVIEW_RELEVANT'>Guest rating + our choices</option>
          <option value='PROPERTY_CLASS'>Property class</option>
        </select>
        <p className={classes.sortby}>Sort By</p>
      </section>
    </div>
  );
};

export default FilterBar;
