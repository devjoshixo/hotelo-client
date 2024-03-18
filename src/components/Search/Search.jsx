import React, { useEffect, useState } from 'react';
import getSearch from '../../api/getSearch';
import Skeleton from '@mui/material/Skeleton';
import classes from './Search.module.css';
import HotelList from './HotelList';

const Search = () => {
  const [hotels, setHotels] = useState([]);
  let loaders = [];
  for (let i = 0; i < 5; i++) {
    loaders.push(
      <div>
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='rectangular' width={210} height={60} />
        <Skeleton variant='rounded' width={210} height={60} />
      </div>
    );
  }
  useEffect(() => {
    const getSearchHotel = async () => {
      const hotelsData = await getSearch();
      setInterval(() => {
        setHotels(hotelsData);
      }, 5000);
    };
    getSearchHotel();
  }, []);

  return (
    <div className={classes.wrapper}>
      {hotels.length > 0 ? <HotelList hotels={hotels} /> : loaders}
    </div>
  );
};

export default Search;
