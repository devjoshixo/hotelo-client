import React, { useEffect, useState, useContext } from 'react';
import getSearch from '../../api/getSearch';
import Skeleton from '@mui/material/Skeleton';
import classes from './Search.module.css';
import HotelItem from './HotelList/HotelItem';
import uniqid from 'uniqid';
import AuthContext from '../../context/AuthContext';
import postSaveProperty from '../../api/postSaveProperty';
import Loader from '../UI/Loader';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filters/Filter';

const Search = () => {
  const [hotels, setHotels] = useState(null);
  const navigation = useLocation();
  const history = useHistory();
  const ctx = useContext(AuthContext);
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
      let details = { token: false, login: false };
      if (ctx.login.user) {
        details = {
          token: ctx.login.user.token,
          login: ctx.login.loggedIn,
        };
      }

      const hotelsData = await getSearch(details.token, details.login);

      setHotels(hotelsData);
    };
    getSearchHotel();
  }, []);

  //
  //To like a hotel and save it
  const propertySaver = async (hotel) => {
    if (ctx.login.loggedIn) {
      const response = await postSaveProperty(
        ctx.login.user.email,
        ctx.login.user.token,
        hotel
      );

      return response.liked;
    } else {
      sessionStorage.setItem(
        'redirect',
        JSON.stringify({ redirect: location.pathname + location.search })
      );
      history.push('/account/login');
    }
  };

  return (
    <>
      <SearchBar />
      <div className={classes.wrapper}>
        {hotels && (
          <Filter filter={hotels.universalSortAndFilter.filterSections} />
        )}
        {hotels ? (
          <div className={classes.hotellist}>
            {hotels.properties.map((hotel) => {
              return (
                <HotelItem
                  hotel={{
                    ...hotel,
                    saved: hotel.saved ? true : false,
                  }}
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
    </>
  );
};

export default Search;
