import React, { useEffect, useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/UseOutsideClick';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Travellers from './Travellers/Travellers';
import { useLocation, useHistory } from 'react-router-dom';
import getSearchList from '../../../api/getSearchList';

import uniqid from 'uniqid';
import searchApi from '../../Home/Search/searchApi';
import SearchSkeleton from '../../UI/SearchSkeleton';

const DEFAULT_ROOM = { adults: 1, children: [] };
let defaultdate = new Date();
let newDate = new Date(defaultdate);
newDate.setDate(defaultdate.getDate() + 1);

const SearchBar = () => {
  //
  ////States for the search bar
  const [rooms, setRooms] = useState({});
  const location = useLocation();

  let searchForDate = Object.fromEntries(new URLSearchParams(location.search));
  const startDate = searchForDate.startDate;
  const endDate = searchForDate.endDate;
  if (startDate == endDate) {
    const newDate = new Date(endDate);
    endDate.setDate(newDate.getDate() + 1);
  }
  const [dates, setDates] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: 'selection',
    },
  ]);

  const [destination, setDestination] = useState({ name: '', regionId: 0 });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const navigate = useHistory();

  const [searchRef, search, setSearch] = useOutsideClick();
  const [durationRef, duration, setDuration] = useOutsideClick();
  const [passengerRef, passenger, setPassenger] = useOutsideClick();
  ////States for the search bar
  //

  const ICONS = {
    AIRPORT: (
      <i
        className='fa-solid fa-plane-up fa-rotate-by'
        style={{ '--fa-rotate-angle': '45deg;' }}
      />
    ),
    HOTEL: <i className='fa-solid fa-hotel' style={{ color: '#000000' }}></i>,
    PLACE: <i className='fa-solid fa-location-dot'></i>,
  };

  //
  ////
  useEffect(() => {
    const search = Object.fromEntries(new URLSearchParams(location.search));

    //
    ////
    setDestination((prevState) => {
      return { regionId: search.regionId, name: search.destination };
    });

    setDates([
      {
        startDate: new Date(search.startDate),
        endDate: new Date(search.endDate),
        key: 'selection',
      },
    ]);

    //
    ////
    setRooms(() => {
      let adults = search.adults.split(',');
      let children = search.children.split(',') || [];
      let rooms = [];
      let totalAdults = 0;

      for (let i = 0; i < adults.length; i++) {
        let childrens = [];
        children.forEach((child) => {
          let [roomIndex, age] = child.split('_');
          if (parseInt(roomIndex) === i + 1) {
            childrens.push({ age: parseInt(age) });
          }
        });
        totalAdults += parseInt(adults[i]);
        rooms.push({ adults: parseInt(adults[i]), children: childrens });
      }

      return {
        travellers: rooms,
        total: totalAdults,
        totalRooms: adults.length,
      };
    });
  }, []);
  useEffect(() => {
    const search = Object.fromEntries(new URLSearchParams(location.search));
    setDates(() => {
      const startDate = new Date(search.startDate);
      const endDate = new Date(search.endDate);

      if (startDate.getTime() === endDate.getTime()) {
        endDate.setDate(endDate.getDate() + 1);
      }

      return [
        {
          startDate: startDate,
          endDate: endDate,
          key: 'selection',
        },
      ];
    });
  }, [duration]);

  //
  ////Use effect for delaying destination search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination.name.trim() !== '') {
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
  }, [rooms.travellers]);
  ////Counting the travellers
  //

  useEffect(() => {
    if (destination.regionId == -2 || destination.regionId == 0) return;
    //
    //// if the regionId is not -2 then it means the user has selected a destination

    setSearch(false);
  }, [destination.regionId]);

  useEffect(() => {
    setSearchResults([]);
    setLoading(true);

    const timer = setTimeout(async () => {
      if (destination.name.trim() !== '') {
        const search = searchApi;

        // const search = await getSearchList(destination.name);

        if (!search) {
          setLoading(false);
          return;
        }
        setSearchResults(search);

        setLoading(false);
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [destination.name]);

  useEffect(() => {
    if (destination.regionId == -2 || destination.regionId == 0) return;

    //
    //// if the regionId is not -2 then it means the user has selected a destination
    setSearch(false);
    formSubmitHandler();
  }, [destination.regionId]);

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
      // parameterReplace();
      formSubmitHandler();

      setDuration(false);
    } else {
      setDuration(true);
    }
  };
  ////Closing calender floater
  //

  const parameterReplace = () => {
    let search = location.search;
    const obj = {
      startDate: finalFormatDate(dates[0].startDate),
      endDate: finalFormatDate(dates[0].endDate),
      destination: destination.name,
      regionId: destination.regionId,
    };
    navigate.replace({ search: new URLSearchParams(obj).toString() });
  };

  const formSubmitHandler = (event) => {
    if (event) event.preventDefault();
    let search = Object.fromEntries(new URLSearchParams(location.search));

    let adults = '';
    let children = '';

    //processing traveller data
    rooms.travellers.map((item, index) => {
      adults += `${item.adults}`;
      if (index < rooms.travellers.length - 1) {
        adults += ',';
      }
      item.children.map((child, child_index) => {
        children += `${index + 1}_${child.age}`;

        //if not last element then we add a comma
        if (child_index < item.children.length - 1) {
          children += ',';
        }
      });

      // Add a comma between different rooms' children if not the last room
      if (index < rooms.travellers.length - 1 && item.children.length > 0) {
        children += ',';
      }
    });

    let startDate = finalFormatDate(dates[0].startDate);
    let endDate = finalFormatDate(dates[0].endDate);

    if (startDate == endDate) {
      const newEndDate = new Date(dates[0].endDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      endDate = finalFormatDate(newEndDate);
    }

    const newSearch = {
      ...search,
      startDate: startDate,
      endDate: endDate,
      destination: destination.name,
      regionId: destination.regionId,
      adults: adults,
      children: children,
    };
    navigate.replace({ search: new URLSearchParams(newSearch).toString() });
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
                if (event.target.getAttribute('name') == 'listName') {
                  setDestination((prevState) => {
                    return {
                      name: event.target.children[1].children[0].innerText,
                      regionId: 0,
                    };
                  });
                } else {
                  if (event.target.getAttribute('name') == 'searching') {
                    setSearch(false);
                  } else {
                    setSearch(true);
                  }
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
                  {destination.name.substring(0, 30)}
                </>
              )}
              {search && (
                <div
                  className='absolute top-[-4%] left-[-1%] bg-[white] rounded-[10px] w-[21.5rem] h-[30rem] z-[99]'
                  name='search'
                >
                  {/* Floating Search */}
                  <div>
                    <input
                      type='text'
                      value={destination.name}
                      className='relative w-[21.2rem] h-[3.5rem] text-[black] border border-[#3d3d3d1f] bg-[white] pl-[20px] pr-10 text-[1.4rem] font-[700] rounded-[10px_10px_0_0] focus:outline-none'
                      placeholder='Going to'
                      ref={inputRef}
                      onChange={(e) =>
                        setDestination((prevState) => {
                          return {
                            regionId: 0,
                            name: e.target.value,
                          };
                        })
                      }
                    />
                    {destination.name.trim() != '' && (
                      <div>
                        <i
                          className='absolute fa-solid fa-xmark top-[4%] right-[3%] text-[white] bg-[black] text-center w-4 h-4 rounded-[50%] cursor-pointer'
                          onClick={() => {
                            setDestination({ name: '', regionId: -2 });
                          }}
                        ></i>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col items-start h-[26rem] justify-start overflow-y-auto'>
                    {destination.name.trim() != '' ? (
                      <div className='flex flex-col items-start mt-2 py-2 justify-start w-full h-full'>
                        {searchResults.map((item, index) => {
                          if (loading) return null;
                          if (index > 8) return null;
                          let icon = ICONS['PLACE'];
                          if (item.type == 'AIRPORT' || item.type == 'HOTEL') {
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
                            item.regionNames.secondaryDisplayName.length < 40
                              ? item.regionNames.secondaryDisplayName
                              : item.regionNames.secondaryDisplayName.substring(
                                  0,
                                  40
                                );
                          return (
                            <button
                              key={primaryplace + secondaryplace}
                              className='flex items-center justify-start gap-4 pl-4 py-4 w-full h-[3.7rem] bg-[white] border-none text-[0.9rem] font-medium text-[black] hover:bg-[#6fb8fd1d]'
                              name='listName'
                              onClick={(event) => {
                                event.preventDefault();
                                setDestination({
                                  name: primaryplace + ', ' + secondaryplace,
                                  regionId: item.gaiaId,
                                });
                              }}
                            >
                              {icon}
                              <div className='flex flex-col items-start'>
                                <h3 className='text-sm font-bolder m-0'>
                                  {primaryplace}
                                </h3>
                                <p className='text-xs text-[rgba(47, 47, 47, 0.76)]'>
                                  {secondaryplace}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                        {!loading && (
                          <button
                            className='flex items-center justify-start gap-4 pl-4 py-4 w-full h-[3.7rem] bg-[white] border-none text-[0.8rem] font-medium text-[black] hover:bg-[#6fb8fd31]'
                            name='searching'
                          >
                            <i className='fa-solid fa-magnifying-glass scale-[1.6]'></i>{' '}
                            Search for "{destination.name.substring(0, 30)}"
                          </button>
                        )}
                        {loading && <SearchSkeleton />}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
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
                  onChange={(item) => {
                    setDates([item.selection]);
                  }}
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
                    className='rounded-[30px] w-24 h-12 text-base font-medium cursor-pointer border-none text-[white] bg-[#1668e3] hover:bg-[#1255ba]'
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
