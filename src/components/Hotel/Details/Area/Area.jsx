import React from 'react';
import classes from './Area.module.css';
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
    <div className='w-full'>
      <h3 className='font-normal my-[10px] mx-0'>Enjoy the area</h3>
      <div>
        <div className='w-[19rem] h-28 overflow-hidden relative border-[#0000002f]'>
          <img
            src={
              props.location.staticImage.url
              //   '&key=AIzaSyC9tTt9LrnaoixJGy9MG6kcgt_Lv5srPYY'
            }
            alt=''
          />
        </div>
        <div className={classes.imageCard}>
          {props.location.address.addressLine}
          <p className={classes.link}>View in a map</p>
        </div>
      </div>
      <div className={classes.poi}>
        <List>
          {props.nearbyPOIs.items.map((place) => {
            return (
              <div className={classes.subPoi} key={place.text}>
                <ListItem>
                  <ListItemAvatar>
                    <p>{ICONS[place.icon.id]}</p>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<p className={classes.name}>{place.text}</p>}
                  />
                  <ListItemText primary={place.moreInfo} />
                </ListItem>
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Area;
