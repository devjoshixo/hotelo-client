import React from 'react';
import apartment from '../../../assets/apartment.svg';

const LIST_ICONS = [
  'building',
  'warehouse',
  'ship',
  'house-chimney',
  'umbrella-beach',
  'infinity',
  'spa',
  'house-user',
  'paw',
  'hot-tub-person',
  'water',
  'people-roof',
];
const SUBTEXT = [
  ['Apart-', 'ment'],
  ['Villa'],
  ['House-', 'boat'],
  ['Cottage'],
  ['Resort'],
  ['All inclu-', 'sive'],
  ['Spa'],
  ['Apart ho-', 'tel'],
  ['Pet', 'friendly'],
  ['Hot tub'],
  ['Sea view'],
  [['Family'], ['friendly']],
];

const Lodging = () => {
  return (
    <div className='my-4 mx-0 flex flex-col flex-nowrap'>
      <h1 className='text-[1.8rem] font-medium m-0 py-2 px-0'>
        Discover your new favourite stay
      </h1>
      <div className='flex flex-row flex-nowrap mt-[0.4rem] justify-between gap-5'>
        {LIST_ICONS.map((icon, index) => {
          return (
            <div className='flex flex-col flex-nowrap items-center' key={icon}>
              <div className='w-[4.5rem] h-[4.5rem] rounded-[50%] border-action-input border flex mb-[0.4rem] items-center z-[9] justify-center hover:bg-[#62626226]'>
                <i
                  className={`fa-solid fa-${icon} scale-[2.3] text-[#1668e3]`}
                ></i>
              </div>
              <div>
                {SUBTEXT[index].map((i) => {
                  return (
                    <p className='m-0 text-center' key={i}>
                      {i}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lodging;
