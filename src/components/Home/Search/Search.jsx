import React, { useEffect, useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/UseOutsideClick';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Travellers from './Travellers/Travellers';
import { useLocation, useHistory } from 'react-router-dom';

import uniqid from 'uniqid';
import getSearchList from '../../../api/getSearchList';
import Skeleton from '@mui/material/Skeleton';

const DEFAULT_ROOM = { adults: 1, children: [] };
let defaultdate = new Date();
let newDate = new Date(defaultdate);
newDate.setDate(defaultdate.getDate() + 2);

const loader = (
  <div className='flex flex-col gap-6 p-5'>
    <Skeleton width={200} height={20} sx={{ borderRadius: '20px' }} />
    <Skeleton width={200} height={20} sx={{ borderRadius: '20px' }} />
    <Skeleton width={200} height={20} sx={{ borderRadius: '20px' }} />
  </div>
);

const Search = () => {
  const [rooms, setRooms] = useState({
    travellers: [{ adults: 2, children: [] }],
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

  const [error, setError] = useState(null);
  const [searchLoader, setSearchLoader] = useState(false);

  const [destination, setDestination] = useState({ name: '', regionId: 3456 });
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useHistory();

  const [searchRef, search, setSearch] = useOutsideClick();
  const [durationRef, duration, setDuration] = useOutsideClick();
  const [passengerRef, passenger, setPassenger] = useOutsideClick();

  const ICONS = {
    AIRPORT: (
      <i
        class='fa-solid fa-plane-up fa-rotate-by'
        style={{ '--fa-rotate-angle': '45deg;' }}
      />
    ),
    HOTEL: <i class='fa-solid fa-hotel' style={{ color: '#000000' }}></i>,
    PLACE: <i class='fa-solid fa-location-dot'></i>,
  };

  useEffect(() => {
    // setSearchLoader(true);
    // const timer = setTimeout(async () => {
    //   if (destination.name.trim() !== '') {
    //     const search = await getSearchList(destination.name);
    //     if (!search) {
    //       return;
    //     }
    //     setSearchResults(search);
    //     setSearchLoader(false);
    //   }
    // }, 500);
    // return () => clearTimeout(timer);
  }, [destination.name]);

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
    if (destination.name.trim() == '') {
      setError('Please select a destination');
      return;
    } else {
      setError(null);
    }
    let adults = '';
    let children = '';
    rooms.travellers.map((item, index) => {
      item.children.map((child, childIndex) => {
        children += index + 1 + '_' + child.age;
        if (
          index == rooms.travellers.length - 1 &&
          childIndex == item.children.length - 1
        ) {
          return;
        }
        children += ',';
      });
      adults += item.adults;
      if (index == rooms.travellers.length - 1) {
        return;
      }
      adults += ',';
    });
    const obj = {
      startdate: finalFormatDate(dates[0].startDate),
      endDate: finalFormatDate(dates[0].endDate),
      destination: destination.name,
      regionId: destination.regionId,
      adults: adults,
      children: children,
      sort: 'RECOMMENDED',
    };
    // console.log(new URLSearchParams(obj).toString());
    navigate.push({
      pathname: '/search',
      search: new URLSearchParams(obj).toString(),
    });
  };

  function finalFormatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className=''>
      <header className='flex flex-col max-w-[80rem] my-0 mx-auto items-start'>
        <h1 className='text-[2.3rem] font-500 m-0 py-2 px-0'>Where to?</h1>
        <div className='flex flex-row flex-nowrap gap-4'>
          <div name='search'>
            {/* // */}
            {/* Going to */}

            <header
              className={`flex relative flex-row flex-nowrap py-3 items-center w-[19rem] gap-4 border border-search-input cursor-pointer pl-4 rounded-[10px] ${
                error ? 'shadow-[inset_0_0_0_1px] shadow-[#a7183c]' : ''
              }`}
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
              <div className='overflow-x-hidden flex relative pl-[0.2rem] justify-start items-center gap-[0.4rem]'>
                {destination.name.trim() == '' ? (
                  <>
                    <i className='fa-solid fa-location-dot'></i>Search places,
                    hotels, and more
                  </>
                ) : (
                  destination.name
                )}
              </div>
              <p className='absolute m-0 top-full text-[#a7183c]'>{error}</p>
              {search && (
                <div
                  className='absolute top-[-4%] left-[-1%] bg-[white] rounded-[10px] w-[23.2rem] min-h-[26.5rem] z-[9999]'
                  name='search'
                >
                  {/* Floating Search */}
                  <input
                    type='text'
                    value={destination.name}
                    placeholder='Going to'
                    className='w-[23.2rem] h-[3.5rem] text-[black] border border-[#3d3d3d1f] bg-[white] pl-[20px] text-[1.6rem] font-[700] rounded-[10px_10px_0_0] focus:outline-none'
                    ref={inputRef}
                    onChange={(e) =>
                      setDestination((prevState) => {
                        return { ...prevState, name: e.target.value };
                      })
                    }
                  />
                  {destination.name.trim() != '' ? (
                    <div>
                      {' '}
                      {searchLoader && loader}
                      {!searchLoader && (
                        <div className='flex flex-col items-start justify-start '>
                          {searchResults &&
                            searchResults.map((item, index) => {
                              if (index > 8) return;
                              let icon = ICONS['PLACE'];
                              if (
                                item.type == 'AIRPORT' ||
                                item.type == 'HOTEL'
                              ) {
                                console.log(item.type);
                                icon = ICONS[item.type];
                              }
                              const primaryplace =
                                item.regionNames.primaryDisplayName.length < 34
                                  ? item.regionNames.primaryDisplayName
                                  : item.regionNames.primaryDisplayName.substring(
                                      0,
                                      34
                                    );
                              const secondaryplace =
                                item.regionNames.secondaryDisplayName.length <
                                40
                                  ? item.regionNames.secondaryDisplayName
                                  : item.regionNames.secondaryDisplayName.substring(
                                      0,
                                      40
                                    );
                              return (
                                <button className='flex items-center justify-start gap-4 pl-4 pr-1 w-full h-[3.7rem] bg-[white] border-none text-base text-[black] hover:bg-[#2f5b854f]'>
                                  {icon}
                                  <div className='flex w-[90%] flex-col items-start pr-[0rem] text-[0.86rem]'>
                                    <h3 className='w-[95%] font-bolder m-0 h-5 text-start font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
                                      {primaryplace}
                                    </h3>
                                    <p className='text-[rgba(64, 64, 64, 0.76)]'>
                                      {secondaryplace}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          <button
                            className='flex items-center justify-start gap-4 pl-4 w-full h-[3.7rem] bg-[white] border-none text-base text-[black] hover:bg-[#2f5b854f]'
                            name='searching'
                          >
                            <i className='fa-solid fa-magnifying-glass scale-[0.9]'></i>{' '}
                            Search for "{destination.name}"
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='text-sm text-center mx-auto my-4'>
                      Search by destination, accommodation or landmark
                    </div>
                  )}
                </div>
              )}
            </header>
          </div>
          {/* // */}

          {/* Date Picker  */}
          <div
            className='flex relative flex-row flex-nowrap items-center w-[19rem] gap-4 border border-search-input cursor-pointer pl-4 rounded-[10px]'
            name='open'
            onClick={closingCalender}
          >
            <i className='fa-solid fa-calendar-day '></i>
            <div className='flex flex-col'>
              <h5 className='m-0 font-bold'>Dates</h5>
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
                className='absolute flex flex-col items-end w-[40rem] h-[29rem] top-[-10%] left-[3%] bg-[white] z-[99] rounded-[20px] shadow-[0px_5px_10px] shadow-[rgba(0,0,0,0.13)]'
                ref={durationRef}
              >
                <DateRange
                  editableDateInputs={true}
                  className='h-[26rem] w-[40.6rem] rounded-[20px_20px_0_0] text-sm'
                  dateDisplayFormat='iii, dd MMM'
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  minDate={new Date()}
                  direction='horizontal'
                  ranges={dates}
                />
                <button
                  className='rounded-[30px] w-28 h-[2.7rem] text-base font-[600] bg-[#1668e3] border-none text-[white] mr-6 hover:bg-[#1655b5]'
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
            className='flex relative flex-row flex-nowrap items-center w-[19rem] gap-4 border border-search-input cursor-pointer pl-4 rounded-[10px]'
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
              <h5 className='m-0 font-bold'>Travellers</h5>
              <p className='m-0'>
                {rooms.total} travellers, {rooms.totalRooms} room
              </p>
            </div>
            {passenger && (
              <div
                className='bg-[white] absolute w-[20rem] min-h-[15rem] gap-4 shadow-[4px_3px_8px] shadow-nav-border top-[120%] left-0 py-0 px-8 rounded-[20px] z-[99]'
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
                    onClick={addingAnotherRoom}
                    className='rounded-[30px] flex justify-center items-center w-[11rem] h-8 hover:bg-[#1668e32b] hover:text-[#094196]'
                  >
                    Add another room
                  </div>
                  <button
                    name='done'
                    className='rounded-[30px] w-24 h-12 text-[1.4rem] font-extrabold text-[#1668e3] cursor-pointer border-none hover:bg-[#1255ba] hover:text-[white]'
                  >
                    Done
                  </button>
                </section>
              </div>
            )}
          </div>

          <button
            className='rounded-[30px] w-24 text-lg font-bold bg-[#1668e3] border-none text-[white] hover:bg-[#1655b5]'
            onClick={formSubmitHandler}
          >
            Search
          </button>
        </div>
      </header>
    </div>
  );
};

export default Search;
