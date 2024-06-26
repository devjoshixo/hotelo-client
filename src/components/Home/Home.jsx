import React from 'react';
import Search from './Search/Search';
import Banner from './Banner/Banner';
import Lodging from './Lodging/Lodging';
import Destinations from './Destinations/Destinations';

const Home = () => {
  return (
    <div className=' flex flex-col justify-center items-center'>
      <div className='max-w-[75rem] flex flex-col items-center'>
        {' '}
        <Search />
        <Banner />
        <Lodging />
        <Destinations />
      </div>
    </div>
  );
};

export default Home;
