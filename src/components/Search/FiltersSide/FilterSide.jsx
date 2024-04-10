import React, { useState } from 'react';
import classes from './FilterSide.module.css';

const FilterSide = (props) => {
  const [filter, setFilter] = useState(props.filter[1]);
  filter.fields[0].multiSelectionOptions.map((item) =>
    console.log(item.primary)
  );
  return (
    <section className={classes.section}>
      <header className={classes.header}>{filter.title}</header>
    </section>
  );
};

export default FilterSide;
