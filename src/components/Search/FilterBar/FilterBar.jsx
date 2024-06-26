import React from 'react';

const FilterBar = (props) => {
  const changeValueGetter = (event) => {
    props.queryAdder('sort', event.target.value);
  };
  return (
    <div className='mb-4 flex justify-between'>
      <section className='ml-4'>
        {props.length && (
          <p className='text-[15px]'>{props.length} properties</p>
        )}
        <p className='font-bold cursor-pointer hover:underline'>
          How our sort order works <i className='fa-solid fa-circle-info' />
        </p>
      </section>
      <section className='relative'>
        <select
          className='w-[17rem] h-[3.3rem] border border-[#00000050] rounded-[12px] text-[black] text-[16px] bg-[white] p-[1rem_0_0_0.7rem]'
          onChange={changeValueGetter}
        >
          <option value='RECOMMENDED'>Recommended</option>
          <option value='PRICE_LOW_TO_HIGH'>Price: low to high</option>
          <option value='PRICE_HIGH_TO_LOW'>Price: high to low</option>
          <option value='REVIEW_RELEVANT'>Guest rating + our choices</option>
          <option value='PROPERTY_CLASS'>Property class</option>
        </select>
        <p className='absolute top-[3%] font-bold left-[6%] text-[14px]'>
          Sort By
        </p>
      </section>
    </div>
  );
};

export default FilterBar;
