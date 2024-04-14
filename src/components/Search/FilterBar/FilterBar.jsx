import React from 'react';
import classes from './FilterBar.module.css';

const FilterBar = (props) => {
  const changeValueGetter = (event) => {
    props.queryAdder('sort', event.target.value);
  };
  return (
    <div className={classes.filterbar}>
      <section className={classes.leftsection}>
        {props.length && (
          <p className={classes.hotellength}>{props.length} properties</p>
        )}
        <p className={classes.sortwork}>
          How our sort order works <i className='fa-solid fa-circle-info' />
        </p>
      </section>
      <section className={classes.rightsection}>
        <select className={classes.filterselect} onChange={changeValueGetter}>
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
