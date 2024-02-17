import React, { useEffect, useState } from 'react';
import classes from './Search.module.css';

const Search = () => {
  const [details, setDetails] = useState({
    destination: '',
    checkInDate: new Date(),
    checkOutDate: '',
    travellers: { adults: 1, children: [] },
    total: 1,
  });

  // const travellerClickHandler = () => {
  //   return
  // }

  return (
    <div className={classes.wrapper}>
      <header className={classes.section}>
        <h1 className={classes.header}>Where to?</h1>
        <div className={classes.searchbar}>
          <input type='text' className={classes.inputbox} />
          <input type='text' className={classes.inputbox} />
          <div className={`${classes.inputbox} ${classes.passenger}`}>
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
