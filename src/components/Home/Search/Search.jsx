import React from 'react';
import classes from './Search.module.css';
const Search = () => {
  return (
    <div className={classes.wrapper}>
      <header className={classes.section}>
        <h1 className={classes.header}>Where to?</h1>
        <div className={classes.searchbar}>
          <input type='text' />
          <input type='text' />
          <input type='text' />
          <button>Search</button>
        </div>
      </header>
    </div>
  );
};

export default Search;
