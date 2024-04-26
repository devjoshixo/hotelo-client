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
import FilterSide from './FiltersSide/FilterSide';
import FilterBar from './FilterBar/FilterBar';
import UseLogout from '../../hooks/UseLogout';

const Search = () => {
  const [hotels, setHotels] = useState({});
  const [filter, setFilter] = useState(null);
  const [showLoaders, setShowLoaders] = useState(true);
  const navigation = useLocation();
  const history = useHistory();
  const location = useLocation();
  const logout = UseLogout();
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
    // let search = Object.fromEntries(new URLSearchParams(location.search));
    let search = new URLSearchParams(location.search);

    setShowLoaders(true);
    setHotels({});
    const getSearchHotel = async () => {
      let details = { token: false, login: false };
      if (ctx.login.user) {
        details = {
          token: ctx.login.user.token,
          login: ctx.login.loggedIn,
        };
      }
      const hotelsData = await getSearch(details.token, details.login);
      if (hotelsData.error) {
        logout();
      }
      setHotels(hotelsData);
      setFilter((prevState) => {
        return hotelsData.universalSortAndFilter.filterSections;
      });
      setShowLoaders(false);
    };
    getSearchHotel();
  }, [location.search]);

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
  //
  ////

  //
  ////Adding a new query or replacing value for existing
  const queryAdder = (name, value) => {
    let search = Object.fromEntries(new URLSearchParams(location.search));
    // console.log(value);
    history.replace({
      search: new URLSearchParams({ ...search, [name]: value }).toString(),
    });
    return;
  };

  return (
    <section className={classes.bodywrapper}>
      <SearchBar />
      <div className={classes.wrapper}>
        {filter && (
          <FilterSide
            filter={filter}
            setFilter={setFilter}
            queryAdder={queryAdder}
          />
        )}
        <div className={classes.hotels}>
          <FilterBar
            length={hotels.properties ? hotels.properties.length : false}
            queryAdder={queryAdder}
          />
          {!showLoaders && (
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
          )}
          {showLoaders && <div className={classes.loaderlist}>{loaders}</div>}
        </div>
      </div>
    </section>
  );
};

export default Search;
