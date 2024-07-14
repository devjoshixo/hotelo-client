import React, { useEffect, useState, useRef } from 'react';
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

const SearchBar = () => {
  //
  ////States for the search bar
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

  const [destination, setDestination] = useState({ name: '', regionId: 3456 });
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useHistory();

  const [searchRef, search, setSearch] = useOutsideClick();
  const [durationRef, duration, setDuration] = useOutsideClick();
  const [passengerRef, passenger, setPassenger] = useOutsideClick();
  ////States for the search bar
  //

  useEffect(() => {
    const search = Object.fromEntries(new URLSearchParams(location.search));
    console.log(search);
    setDestination((prevState) => {
      return { ...prevState, name: search.destination };
    });
    setRooms((prevState) => {
      let arr_adults = search.adults.split(',');
      let arr_children = search.children.split(',');
      let total = 0;
      let totalRooms = arr_adults.length;
      let travellers = arr_adults.map((adults) => {
        total += parseInt(adults);

        return { adults: parseInt(adults), children: [] };
      });
      return { total, totalRooms, travellers };
    });
  }, []);

  //
  ////Use effect for delaying destination search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination.name.trim() !== '') {
        // console.log(destination);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [destination]);
  ////Use effect for delaying destination search
  //

  //
  ////Counting the travellers
  useEffect(() => {
    setRooms((prevState) => {
      let count = 0;
      prevState.travellers.map((item) => {
        count += item.adults + item.children.length;
      });
      let countRoom = prevState.travellers.length;
      return { ...prevState, total: count, totalRooms: countRoom };
    });
    formSubmitHandler();
  }, [rooms.travellers]);
  ////Counting the travellers
  //

  //
  ////Date formatting for calender picker display
  const dateFormatter = (date) => {
    const shortMonthName = date.toLocaleString('default', { month: 'short' });
    const currentDate = date.getDate();
    return [shortMonthName, currentDate];
  };
  ////Date formatting for calender picker display
  //

  //
  ////Adding another room with default room
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
  ////Adding another room with default room
  //

  //
  ////Closing calender floater
  const closingCalender = (event) => {
    const name = event.target.getAttribute('name');
    if (name == 'closer') {
      setDuration(false);

      formSubmitHandler();
    } else {
      setDuration(true);
    }
  };
  ////Closing calender floater
  //

  // const parameterReplace = () => {
  //   let search = location.search;
  //   const obj = {
  //     startdate: finalFormatDate(dates[0].startDate),
  //     endDate: finalFormatDate(dates[0].endDate),
  //     destination: destination.name,
  //     regionId: destination.regionId,
  //   };
  //   navigate.replace({ search: new URLSearchParams(obj).toString() });
  // };

  const formSubmitHandler = (event) => {
    if (event) event.preventDefault();
    let search = Object.fromEntries(new URLSearchParams(location.search));
    const obj = {
      ...search,
      startdate: finalFormatDate(dates[0].startDate),
      endDate: finalFormatDate(dates[0].endDate),
      destination: destination.name,
      regionId: destination.regionId,
    };
    navigate.replace({ search: new URLSearchParams(obj).toString() });
  };

  function finalFormatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className='mt-4 p-[0.7rem_0.5rem_1rem_0.5rem]'>
      <header className='flex flex-col max-w-[80rem] my-0 mx-auto items-start'>
        <div className='flex flex-row flex-nowrap gap-4'>
          <div name='search'>
            {/* // */}
            {/* Going to */}
            <header
              className='flex relative pl-4 justify-start items-center gap-4 bg-[white] w-[21rem] h-[3rem] border-[#00000084] border rounded-[10px] cursor-pointer select-none'
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
              {destination.name.trim() == '' ? (
                <>
                  <i className='fa-solid fa-location-dot scale-[1.4]'></i>Search
                  places, hotels, and more
                </>
              ) : (
                <>
                  <i className='fa-solid fa-location-dot scale-[1.4]'></i>{' '}
                  {destination.name}
                </>
              )}
              {search && (
                <div
                  className='absolute top-[-4%] left-[-1%] bg-[white] rounded-[10px] w-[21.5rem] h-[22rem] z-[99]'
                  name='search'
                >
                  {/* Floating Search */}
                  <input
                    type='text'
                    value={destination.name}
                    className='w-[21.4rem] text-[black] border border-[#3d3d3d1f] bg-[white] pl-[20px] text-[1.6rem] font-sans font-semibold rounded-[10px_10px_0_0] h-16 outline-none'
                    placeholder='Going to'
                    ref={inputRef}
                    onChange={(e) =>
                      setDestination((prevState) => {
                        return { ...prevState, name: e.target.value };
                      })
                    }
                  />
                  <button
                    className='flex items-center justify-start gap-4 pl-4 w-full h-12 bg-[white] border-none text-4 text-[black] hover:bg-[#2f5b854f]'
                    name='searching'
                  >
                    <i className='fa-solid fa-magnifying-glass'></i> Search for
                    "{destination.name}"
                  </button>
                </div>
              )}
            </header>
          </div>
          {/* // */}

          {/* Date Picker  */}
          <div
            className='flex relative flex-row flex-nowrap items-center w-[19rem] gap-4 border border-[#00000084] cursor-pointer pl-4 rounded-[10px]'
            name='open'
            onClick={closingCalender}
          >
            <i className='fa-solid fa-calendar-day scale-[1.4]'></i>
            <div className='flex flex-col'>
              <h5 className='m-0'>Dates</h5>
              {dates.map((d) => {
                const formattedStart = dateFormatter(d.startDate);
                const formattedEnd = dateFormatter(d.endDate);
                return (
                  <div key={d.startDate}>
                    <p className='m-0'>
                      {formattedStart[1]} {formattedStart[0]} -{' '}
                      {formattedEnd[1]} {formattedEnd[0]}
                    </p>
                  </div>
                );
              })}
            </div>

            {duration && (
              <div
                className='absolute flex flex-col items-end w-[40rem] h-[30rem] top-[-10%] left-[-3%] bg-[white] z-[99] rounded-[20px] shadow-[0px_5px_10px_#00000021]'
                ref={durationRef}
              >
                <DateRange
                  editableDateInputs={true}
                  className='rounded-[20px_20px_0_0] h-[26rem] w-[40rem] text-sm'
                  dateDisplayFormat='iii, dd MMM'
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  minDate={new Date()}
                  direction='horizontal'
                  ranges={dates}
                />
                <button
                  className='rounded-[30px] w-28 h-12 text-xl font-bold border-none mr-12 bg-[#1668e3] text-[white] hover:bg-[#1655b5]'
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
            className='bg-[white] w-[21rem] h-[3rem] border-[#00000084] border rounded-[10px] cursor-pointer select-none flex relative flex-row items-center gap-2 pl-4 justify-start'
            onClick={(event) => {
              if (event.target.getAttribute('name') == 'done') {
                setPassenger(false);
              } else {
                setPassenger(true);
              }
            }}
          >
            <i className='fa-solid fa-user'></i>
            <div className='flex flex-col justify-start'>
              <h5 className='m-0'>Travellers</h5>
              <p className='m-0 ml-[0.3rem]'>
                {rooms.total} travellers, {rooms.totalRooms} room
              </p>
            </div>
            {passenger && (
              <div
                className='bg-[white] absolute width-[17rem] min-h-60 gap-4 shadow[0px_5px_10px_#00000021] top-[120%] left-0 py-0 px-8 rounded-[20px] z-[99]'
                ref={passengerRef}
              >
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
                <section className='flex flex-col items-end gap-4 text-[#0c57c6] font-extrabold my-4 mx-0'>
                  <div
                    className='rounded-[20px] flex justify-center items-center w-44 h-8 hover:bg-[#1668e32b] hover:text-[#094196]'
                    onClick={addingAnotherRoom}
                  >
                    Add another room
                  </div>
                  <button
                    className='rounded-[30px] w-24 h-12 text-[1.4rem] font-extrabold cursor-pointer border-none bg-[#1668e3] hover:bg-[#1255ba]'
                    name='done'
                  >
                    Done
                  </button>
                </section>
              </div>
            )}
          </div>

          <button
            className='rounded-[50%] w-12 text-[1.1rem] font-extrabold text-[white] bg-[#1668e3] border-none hover:bg-[#1655b5]'
            onClick={formSubmitHandler}
          >
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default SearchBar;
