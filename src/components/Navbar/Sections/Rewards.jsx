import React, { useState } from 'react';

const Rewards = () => {
  const [modal, setModal] = useState(false);

  return (
    <div
      className='text-[#2f5b85] text-2xl cursor-pointer h-12 flex items-center'
      onMouseEnter={() => {
        setModal(true);
      }}
      onMouseLeave={() => {
        setModal(false);
      }}
      name='icon'
    >
      <div className='hover:text-[black]'>
        More travel
        <i className='fa-solid fa-caret-down ml-[4px]' name='icon'></i>
      </div>
      {modal ? (
        <div className='w-[15rem] h-[4rem] p-4 text-base text-[black] fixed top-[4.4%] bordere-1 rounded-[10px] bg-[white] shadow-[1px_1px_2px] shadow-[rgba(105, 105, 105, 0.17)] hover:text-[#1352b1]'>
          Hotelo.com® Rewards
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Rewards;
