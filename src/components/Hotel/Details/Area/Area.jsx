import React from 'react';
import './Area.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

const Area = (props) => {
  const ICONS = {
    place: <i className='fa-solid fa-location-dot'></i>,
    lob_flights: <i className='fa-solid fa-plane'></i>,
  };
  return (
    <div className='w-full flex gap-3 flex-col'>
      <h3 className='font-normal mx-0'>Enjoy the area</h3>
      <div>
        <div className='w-full h-28 overflow-hidden relative border-[#0000002f] border-b-0 rounded-[15px_15px_0_0] cursor-pointer'>
          <img
            src={
              props.location.staticImage.url
              //   '&key=AIzaSyC9tTt9LrnaoixJGy9MG6kcgt_Lv5srPYY'
            }
            className='object-cover rounded-[15px_15px_0_0] object-center h-full w-full'
            alt=''
          />
        </div>
        <div className='w-full border-[#0000002f] border border-t-0 rounded-[0_0_15px_15px] px-3 py-3 text-[0.9rem]'>
          {props.location.address.addressLine}
          <p className='m-0 text-[blue] cursor-pointer hover:underline'>
            View in a map
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {props.nearbyPOIs.items.map((place) => {
          return (
            <div className='flex flex-row gap-2' key={place.text}>
              <div>
                <p className='m-0 pr-4 w-4'>{ICONS[place.icon.id]}</p>
              </div>
              <p className='min-w-[12rem] whitespace-nowrap text-[0.9rem] font-medium mr-2'>
                {place.text}
              </p>
              <div className='whitespace-nowrap'>{place.moreInfo}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Area;
