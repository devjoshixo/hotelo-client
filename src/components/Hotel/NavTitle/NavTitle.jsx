import React, { useState } from 'react';
import uniqid from 'uniqid';

const NavTitle = () => {
  const headings = [
    'Overview',
    'Amenities',
    'Rooms',
    'Accessibility',
    'Policies',
  ];

  const [selected, setSelected] = useState(headings[0]);

  const toggleSelected = (event) => {
    const name = event.target.getAttribute('name');
    setSelected(name);
  };

  return (
    <div className='flex border-b border-[#2c2c2c45] mb-4 justify-between items-center px-4'>
      <div className='flex gap-7'>
        {headings.map((item, index) => {
          return (
            <div
              key={uniqid()}
              className={`text-4 py-2 px-0 border-b-2 hover:border-b-[black] cursor-pointer ${
                selected == item
                  ? 'text-[blue]  border-b-[blue] hover:border-b-[blue]'
                  : 'border-b-[transparent]'
              } `}
              name={item}
              onClick={toggleSelected}
            >
              {item}
            </div>
          );
        })}
      </div>
      <button className='w-44 rounded-3xl p-[0.6rem] text-[white] font-bold text-[1.1rem] border-none bg-[#1668e3] cursor-pointer hover:brightness-90'>
        Reserve a room
      </button>
    </div>
  );
};

export default NavTitle;
