import React, { useEffect, useState } from 'react';
import getSearch from '../../api/getSearch';
import Skeleton from '@mui/material/Skeleton';
import classes from './Search.module.css';
import HotelList from './HotelList';

const Search = () => {
  const [hotels, setHotels] = useState(null);
  useEffect(() => {
    const getSearchHotel = async () => {
      const hotelsData = await getSearch();
      setHotels(hotelsData);
    };
    getSearchHotel();
  }, []);

  return (
    <div className={classes.wrapper}>
      {hotels && <HotelList hotels={hotels} />}
    </div>
  );
};

export default Search;
