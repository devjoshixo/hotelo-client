import React, { useState } from 'react';
import uniqid from 'uniqid';
import MultiStacked from './Filters/MultiStacked';
import MultiSelection from './Filters/MultiSelection';
import SelectionField from './Filters/SelectionField';
import MultiTile from './Filters/MultiTile';
import RangeField from './Filters/RangeField';

const FilterSide = (props) => {
  const [filter, setFilter] = useState(props.filter[1]);

  return (
    <section className='max-w-[20%] font-normal'>
      <header className='text-[1.3rem] mb-8'>{filter.title}</header>
      <div className='flex flex-col gap-4'>
        {/*    */}
        {/* Filter Headers and subcomponent render  */}
        {filter.fields.map((item) => {
          if (item.primary == 'Popular locations') {
            return;
          }
          //
          ////
          const filterNames = {
            ShoppingMultiSelectionField: (
              <MultiSelection
                item={item}
                key={uniqid()}
                queryAdder={props.queryAdder}
              />
            ),
            ShoppingRangeField: (
              <RangeField
                item={item}
                key={uniqid()}
                queryAdder={props.queryAdder}
              />
            ),
            ShoppingSelectionField: (
              <SelectionField
                item={item}
                key={uniqid()}
                queryAdder={props.queryAdder}
              />
            ),
            ShoppingMultiSelectionStackedTileField: (
              <MultiStacked
                item={item}
                key={uniqid()}
                queryAdder={props.queryAdder}
              />
            ),
            ShoppingMultiSelectionTileField: (
              <MultiTile
                item={item}
                key={uniqid()}
                queryAdder={props.queryAdder}
              />
            ),
          };

          //
          ////
          return (
            <div key={uniqid()}>
              <p className='text-sm font-semibold m-0'>{item.primary}</p>
              {filterNames[item.__typename]}
              <br />
            </div>
          );
        })}
        {/*     */}
      </div>
    </section>
  );
};

export default FilterSide;
