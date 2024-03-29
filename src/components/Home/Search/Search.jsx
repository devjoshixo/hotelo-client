import React, { useEffect, useState, useRef } from 'react';
import classes from './Search.module.css';
import useOutsideClick from '../../../hooks/UseOutsideClick';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Travellers from './Travellers/Travellers';
import { useLocation, useHistory } from 'react-router-dom';

import uniqid from 'uniqid';

const DEFAULT_ROOM = { adults: 1, children: [] };
let defaultdate = new Date();
let newDate = new Date(defaultdate);
newDate.setDate(defaultdate.getDate() + 2);

const Search = () => {
  const [rooms, setRooms] = useState({
    travellers: [{ adults: 1, children: [] }],
    total: 1,
    totalRooms: 1,
  });
  const [dates, setDates] = useState([
    {
      startDate: defaultdate,
      endDate: newDate,
      key: 'selection',
    },
  ]);

  const [destination, setDestination] = useState('');
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useHistory();

  const [searchRef, search, setSearch] = useOutsideClick();
  const [durationRef, duration, setDuration] = useOutsideClick();
  const [passengerRef, passenger, setPassenger] = useOutsideClick();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination.trim() !== '') {
        console.log(destination);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [destination]);

  const dateFormatter = (date) => {
    const shortMonthName = date.toLocaleString('default', { month: 'short' });
    const currentDate = date.getDate();
    return [shortMonthName, currentDate];
  };

  useEffect(() => {
    setRooms((prevState) => {
      let count = 0;
      prevState.travellers.map((item) => {
        count += item.adults + item.children.length;
      });
      let countRoom = prevState.travellers.length;
      return { ...prevState, total: count, totalRooms: countRoom };
    });
  }, [rooms.travellers]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  const addingAnotherRoom = () => {
    setRooms((prevState) => {
      const newTravellers = [...prevState.travellers, DEFAULT_ROOM];
      return {
        travellers: newTravellers,
        total: prevState.total + 1,
        totalRooms: prevState.totalRooms + 1,
      };
    });
  };

  const closingCalender = (event) => {
    const name = event.target.getAttribute('name');
    if (name == 'closer') {
      setDuration(false);
    } else {
      setDuration(true);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const obj = [
      ['startdate=', finalFormatDate(dates[0].startDate)],
      ['endDate=', finalFormatDate(dates[0].endDate)],
      ['destination=', destination],
    ];
    navigate.push('/search?asd=4_1,3_4');
  };

  function finalFormatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
              onClick={(event) => {
                if (event.target.getAttribute('name') == 'searching') {
                  setSearch(false);
                } else {
                  setSearch(true);
                }
              }}
            >
              {destination.trim() == '' ? (
                <>
                  <i className='fa-solid fa-location-dot'></i>Search places,
                  hotels, and more
                </>
              ) : (
                destination
              )}
              {search && (
                <div className={classes.searchfloat} name='search'>
                  {/* Floating Search */}
                  <input
                    type='text'
                    value={destination}
                    placeholder='Going to'
                    ref={inputRef}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <button
                    className={classes.destinationbutton}
                    name='searching'
                  >
                    <i className='fa-solid fa-magnifying-glass'></i> Search for
                    "{destination}"
                  </button>
                </div>
              )}
            </header>
          </div>
          {/* // */}

          {/* Date Picker  */}
          <div
            className={classes.datePicker}
            name='open'
            onClick={closingCalender}
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
                  minDate={new Date()}
                  direction='horizontal'
                  ranges={dates}
                />
                <button
                  className={classes.calenderbutton}
                  name='closer'
                  onClick={closingCalender}
                >
                  Done
                </button>
              </div>
            )}
          </div>
          {/* // */}

          <div
            className={`${classes.inputbox} ${classes.passenger}`}
            onClick={(event) => {
              if (event.target.getAttribute('name') == 'done') {
                setPassenger(false);
              } else {
                setPassenger(true);
              }
            }}
          >
            <i className='fa-solid fa-user'></i>
            <div className={classes.subpassenger}>
              <h5>Travellers</h5>
              <p>
                {rooms.total} travellers, {rooms.totalRooms} room
              </p>
            </div>
            {passenger && (
              <div className={classes.floatingpassenger} ref={passengerRef}>
                {rooms.travellers.map((item, index) => {
                  return (
                    <Travellers
                      key={uniqid()}
                      rooms={item}
                      setRooms={setRooms}
                      index={index + 1}
                      passengerRef={passengerRef}
                      totalRooms={rooms.totalRooms}
                    />
                  );
                })}
                <section className={classes.another}>
                  <div onClick={addingAnotherRoom}>Add another room</div>
                  <button name='done'>Done</button>
                </section>
              </div>
            )}
          </div>

          <button className={classes.action} onClick={formSubmitHandler}>
            Search
          </button>
        </div>
      </header>
    </div>
  );
};

export default Search;
