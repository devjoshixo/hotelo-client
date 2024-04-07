import React, { useState } from 'react';
import classes from './FilterSide.module.css';

const FilterSide = (props) => {
  const filter = props.filter[1];
  const setFilter = props.setFilter;
  return (
    <section className={classes.section}>
      <header className={classes.header}>{filter.title}</header>
    </section>
  );
};

export default FilterSide;
