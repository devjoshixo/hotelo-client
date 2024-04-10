import React, { useState } from 'react';
import classes from './FilterSide.module.css';
import uniqid from 'uniqid';
import MultiStacked from './Filters/MultiStacked';
import MultiSelection from './Filters/MultiSelection';
import SelectionField from './Filters/SelectionField';
import MultiTile from './Filters/MultiTile';
import RangeField from './Filters/RangeField';

const FilterSide = (props) => {
  const [filter, setFilter] = useState(props.filter[1]);

  return (
    <section className={classes.section}>
      <header className={classes.header}>{filter.title}</header>
      {/*    */}
      {/* Filter Headers and subcomponent render  */}
      {filter.fields.map((item) => {
        //
        ////
        const filterNames = {
          ShoppingMultiSelectionField: (
            <MultiSelection item={item} key={uniqid()} />
          ),
          ShoppingRangeField: <RangeField item={item} key={uniqid()} />,
          ShoppingSelectionField: <SelectionField item={item} key={uniqid()} />,
          ShoppingMultiSelectionStackedTileField: (
            <MultiStacked item={item} key={uniqid()} />
          ),
          ShoppingMultiSelectionTileField: (
            <MultiTile item={item} key={uniqid()} />
          ),
        };
        //
        ////
        return (
          <>
            <p className={classes.filterHeading} key={uniqid()}>
              {item.primary}
            </p>
            {filterNames[item.__typename]}
          </>
        );
      })}
      {/*     */}
    </section>
  );
};

export default FilterSide;
