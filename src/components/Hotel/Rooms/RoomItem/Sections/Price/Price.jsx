import React from 'react';

const Price = (props) => {
  return (
    <div className='flex justify-between mx-4'>
      <div>
        <h2 className='text-xl'>
          {
            props.prices.priceDetails[0].price.displayMessages[0].lineItems[0]
              .price.formatted
          }
        </h2>
        <p className='text-xs'>
          {
            props.prices.priceDetails[0].price.displayMessages[1].lineItems[0]
              .value
          }
        </p>
        <p className='text-sm'>
          {
            props.prices.priceDetails[0].price.displayMessages[2].lineItems[0]
              .value
          }
        </p>
        <div className='text-[blue] text-sm flex items-center gap-1 '>
          <p className='hover:underline'>Price details</p>
          <i className='fa-solid fa-angle-right scale-[0.8]'></i>
        </div>
      </div>
      <div className='flex flex-col justify-end  gap-1 items-end'>
        <p className='text-[red] text-[0.8rem]'>
          {props.prices.priceDetails[0].availability.scarcityMessage}
        </p>
        <button className='rounded-[20px] bg-[#1668e3] text-[white] font-bold w-32 h-12 hover:bg-[#244f90]'>
          Reserve
        </button>
      </div>
    </div>
  );
};

export default Price;
