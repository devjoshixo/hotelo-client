import React from 'react';
import Search from './Search/Search';
import Banner from './Banner/Banner';
import Lodging from './Lodging/Lodging';
import Destinations from './Destinations/Destinations';

const Home = () => {
  return (
    <div className='max-w-[100vw] flex flex-col justify-center items-center'>
      <Search />
      <Banner />
      <Lodging />
      <Destinations />
    </div>
  );
};

export default Home;
