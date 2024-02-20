import React from 'react';
import Search from './Search/Search';
import Banner from './Banner/Banner';
import Lodging from './Lodging/Lodging';
import Destinations from './Destinations/Destinations';
import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes.container}>
      <Search />
      <Banner />
      <Lodging />
      <Destinations />
    </div>
  );
};

export default Home;
