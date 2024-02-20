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

  const [modal, setModal] = useState({
    search: false,
    date: false,
    travel: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (details.destination.trim() !== '') {
        console.log(details.destination);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [details.destination]);

  const modalOpener = (event) => {
    const name = event.target.getAttribute('name');
    setModal((prevState) => {
      console.log(prevState[`${name}`]);
      return { ...prevState, [name]: !prevState[`${name}`] };
    });
    setDetails((prevState) => {
      return { ...prevState, destination: '' };
    });
  };

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
              onMouseEnter={modalOpener}
              onMouseLeave={modalOpener}
            >
              <i className='fa-solid fa-location-dot'></i>Going to
              {modal.search && (
                <div className={classes.searchfloat} name='search'>
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
