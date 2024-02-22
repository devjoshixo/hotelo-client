import React, { useEffect, useState, useRef } from 'react';
import classes from './Search.module.css';
import useOutsideClick from '../../../hooks/UseOutsideClick';

const Search = () => {
  const [details, setDetails] = useState({
    destination: '',
    checkInDate: new Date(),
    checkOutDate: new Date(),
    travellers: { adults: 1, children: [] },
    total: 1,
  });

  const [searchRef, search, setSearch] = useOutsideClick();
  const [durationRef, duration, setDuration] = useOutsideClick();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (details.destination.trim() !== '') {
        console.log(details.destination);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [details.destination]);

  return (
    <div className={classes.wrapper}>
      <header className={classes.section}>
        <h1 className={classes.header}>Where to?</h1>
        <div className={classes.searchbar}>
          <div name='search'>
            {/* // */}
            {/* Going to */}
            <header
              className={`${classes.inputbox} ${classes.searchbox}`}
              name='search'
              ref={searchRef}
              onClick={() => {
                setSearch(true);
              }}
            >
              <i className='fa-solid fa-location-dot'></i>Going to
              {search && (
                <div
                  className={classes.searchfloat}
                  name='search'
                  onMouseDown={() => modalOpener(false)}
                >
                  {/* Floating Search */}
                  <input
                    type='text'
                    value={details.destination}
                    placeholder='Going to'
                    onChange={(e) =>
                      setDetails((prevState) => {
                        return { ...prevState, destination: e.target.value };
                      })
                    }
                  />
                </div>
              )}
            </header>
          </div>
          {/* // */}

          {/* // */}
          <div
            className={`${classes.inputbox} ${classes.passenger}`}
            ref={durationRef}
          >
            <i className='fa-solid fa-user'></i>
            <div>
              <h5>Travellers</h5>
              <p></p>
            </div>
          </div>
          <button>Search</button>
        </div>
      </header>
    </div>
  );
};

export default Search;
