import React, { useEffect, useState, useRef } from 'react';
import classes from './Search.module.css';
import useOutsideClick from '../../../hooks/UseOutsideClick';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Travellers from './Travellers/Travellers';
import uniqid from 'uniqid';

const Search = () => {
  const [rooms, setRooms] = useState({
    travellers: [{ adults: 6, children: [] }],
    total: 1,
    totalRoom: 1,
  });
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(+1),
      key: 'selection',
    },
  ]);
  const [destination, setDestination] = useState('');

  const [searchRef, search, setSearch] = useOutsideClick();
  const [durationRef, duration, setDuration] = useOutsideClick();
  const [passengerRef, passenger, setPassenger] = useOutsideClick();
  // console.log(rooms);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination.trim() !== '') {
        console.log(destination);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [destination]);

  const dateFormatter = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = date.getDay();
    const currentDate = date.getDate();
    return [daysOfWeek[dayIndex], currentDate];
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
                    value={destination}
                    placeholder='Going to'
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              )}
            </header>
          </div>
          {/* // */}
          <div
            className={classes.datePicker}
            onClick={() => {
              setDuration(true);
            }}
          >
            <i className='fa-solid fa-calendar-day'></i>
            <div className={classes.dateFleX}>
              <h5>Dates</h5>
              {dates.map((d) => {
                const formattedStart = dateFormatter(d.startDate);
                const formattedEnd = dateFormatter(d.endDate);
                return (
                  <div key={d.startDate}>
                    <p>
                      {formattedStart[1]} {formattedStart[0]} -{' '}
                      {formattedEnd[1]} {formattedEnd[0]}
                    </p>
                  </div>
                );
              })}
            </div>

            {duration && (
              <div className={classes.calenderwrapper} ref={durationRef}>
                <DateRange
                  editableDateInputs={true}
                  className={classes.calender}
                  dateDisplayFormat='iii, dd MMM'
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  direction='horizontal'
                  ranges={dates}
                />
              </div>
            )}
          </div>
          {/* // */}

          <div
            className={`${classes.inputbox} ${classes.passenger}`}
            onClick={() => {
              setPassenger(true);
            }}
          >
            <i className='fa-solid fa-user'></i>
            <div>
              <h5>Travellers</h5>
              <p></p>
            </div>
            {passenger && (
              <div className={classes.floatingpassenger} ref={passengerRef}>
                {rooms.travellers.map((item, index) => {
                  return (
                    <Travellers
                      key={uniqid()}
                      rooms={item}
                      setRooms={setRooms}
                      index={index}
                      passengerRef={passengerRef}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <button className={classes.action}>Search</button>
        </div>
      </header>
    </div>
  );
};

export default Search;
