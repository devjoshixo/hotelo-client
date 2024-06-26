import React, { useRef } from 'react';

const DESTINATION_ARRAY = [
  {
    name: 'Singapore',
    country: 'Singapore',
    link: 'https://mediaim.expedia.com/destination/7/d00990d5f421c142385f606cf7c878c0.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Hong Kong',
    country: 'Hong Kong SAR',
    link: 'https://mediaim.expedia.com/destination/7/dac75899603bf2fb367f384a692486c3.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Seminyak',
    country: 'Indonesia',
    link: 'https://mediaim.expedia.com/destination/1/17cb88f7e585fe0dee98b9fcc0f02be5.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Paris',
    country: 'France',
    link: 'https://mediaim.expedia.com/destination/7/0fafab7fb7f1bbc162ee5066e0971095.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Ubud',
    country: 'Indonesia',
    link: 'https://mediaim.expedia.com/destination/1/74c63fd558e9c225db8a5b1b6b87f9a1.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Chennai',
    country: 'India',
    link: 'https://mediaim.expedia.com/destination/1/9d2f38a494b74bdb645d9901aaeef02e.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Bhubaneshwar',
    country: 'India',
    link: 'https://mediaim.expedia.com/destination/2/124f3952b59a2804712fbaddd7dc2e94.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Ujjain',
    country: 'India',
    link: 'https://mediaim.expedia.com/destination/2/ebddb86e57e3d64b2616534ff0b9f349.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
];

const Destinations = () => {
  const elementRef = useRef(null);

  const carouselHandler = (event) => {
    event.preventDefault();
    const move = 1000;
    const name = event.target.getAttribute('name');
    if (name == 'left') {
      if (elementRef.current.scrollLeft > move) {
        elementRef.current.scrollLeft -= move;
      } else {
        elementRef.current.scrollLeft = 0;
      }
    } else if (name == 'right') {
      elementRef.current.scrollLeft += move;
    }
  };

  return (
    <div className='w-[90%] relative my-8 mx-0 flex flex-col flex-nowrap'>
      <button
        className='rounded-[50%] bg-[white] text-[black] w-[2.6rem] h-[2.6rem] z-[999] border absolute top-[45%] left-[1%]'
        name='left'
        onClick={carouselHandler}
      >
        <i className='fa-solid fa-arrow-left' name='left'></i>
      </button>
      <h1 className='text-[1.8rem] font-thin m-0 py-2 px-0'>
        Explore stays in trending destinations
      </h1>
      <div
        className='relative flex flex-row flex-nowrap gap-4 pb-4 overflow-x-hidden scroll-smooth'
        ref={elementRef}
      >
        {DESTINATION_ARRAY.map((item) => {
          return (
            <div
              className='flex flex-col gap-[-2rem] border border-[#22222244] rounded-[20px] cursor-pointer'
              key={item.name}
            >
              <img
                src={item.link}
                alt={item.name}
                className='w-[18rem] h-36 rounded-[20px_20px_0_0]'
              />
              <div className='p-[0.6rem_0_0_0.6rem] top-[90%] bg-[white] h-[4.2rem] w-[17.41rem] rounded-[0px_0px_20px_20px]'>
                <h3 className='m-0 font-medium'>{item.name}</h3>
                <p className='m-0'>{item.country}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className='rounded-[50%] bg-[white] text-[black] w-[2.6rem] h-[2.6rem] z-[999] border absolute top-[45%] left-[95%]'
        name='right'
        onClick={carouselHandler}
      >
        <i className='fa-solid fa-arrow-right' name='right'></i>
      </button>
    </div>
  );
};

export default Destinations;
