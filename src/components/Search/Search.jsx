import React, { useEffect, useState, useContext } from 'react';
import getSearch from '../../api/getSearch';
import Skeleton from '@mui/material/Skeleton';
import classes from './Search.module.css';
import HotelItem from './HotelItem/HotelItem';
import uniqid from 'uniqid';
import AuthContext from '../../context/AuthContext';
import postSaveProperty from '../../api/postSaveProperty';

const Search = () => {
  const [hotels, setHotels] = useState([]);
  let loaders = [];
  for (let i = 0; i < 5; i++) {
    loaders.push(
      <div className={classes.loaders} key={uniqid()}>
        <Skeleton variant='rounded' width={300} height={250} />
        <div>
          <Skeleton width={250} height={25} />
          <Skeleton width={150} height={25} />
        </div>
      </div>
    );
  }
  useEffect(() => {
    const getSearchHotel = async () => {
      const hotelsData = await getSearch();
      setHotels(hotelsData);
    };
    getSearchHotel();
  }, []);

  const ctx = useContext(AuthContext);
  const propertySaver = async (hotel) => {
    const response = await postSaveProperty(ctx.login.user.email, hotel);
    return response;
  };

  return (
    <div className={classes.wrapper}>
      {hotels.length > 0 ? (
        <div className={classes.hotellist}>
          {hotels.map((hotel) => {
            return (
              <HotelItem
                hotel={hotel.property}
                key={uniqid()}
                propertySaver={propertySaver}
              />
            );
          })}
        </div>
      ) : (
        loaders
      )}
    </div>
  );
};

export default Search;
