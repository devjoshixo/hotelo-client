import React from 'react';

const Banner = () => {
  return (
    <div className='flex flex-row flex-nowrap max-w-[66rem] bg-[#2f5b85] text-[white] gap-4 justify-center items-center rounded-[15px] py-4 px-0 pr-2 my-8 mx-auto'>
      <h3 className='font-medium text-[1.5rem] ml-4 leading-9 max-inline'>
        Find and book your perfect stay
      </h3>
      <div className='flex items-center gap-8 rounded-[20px] pr-[10px] bg-[#13131363] py-7'>
        <i className={`fa-solid fa-moon scale-[3] ml-8`}></i>
        <p className='text-[0.9rem]'>Earn rewards on every night you stay</p>
      </div>
      <div className='flex items-center gap-8 rounded-[20px] pr-[10px] bg-[#13131363] py-7'>
        <i className={`fa-solid fa-tag scale-[3] ml-8`}></i>
        <p className='text-[0.9rem]'>Save more with Member Prices</p>
      </div>
      <div className='flex items-center gap-8 rounded-[20px] pr-[10px] bg-[#13131363] py-7'>
        <i className={`fa-solid fa-calendar-days scale-[3] ml-8`}></i>
        <p className='text-[0.9rem]'>
          Free cancellation options if plans change
        </p>
      </div>
    </div>
  );
};

export default Banner;
