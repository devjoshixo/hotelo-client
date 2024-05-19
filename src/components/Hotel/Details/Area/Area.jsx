import React from 'react';
import classes from './Area.module.css';

const Area = (props) => {
  const ICONS = {
    'Popular Location': <i className='fa-solid fa-location-dot'></i>,
    Airport: <i className='fa-solid fa-plane'></i>,
  };
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>Enjoy the area</h3>
      <div className={classes.imageWrapper}>
        <div className={classes.image}>
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
        {props.nearbyPOIs.items.map((place) => {
          return (
            <div className={classes.subPoi} key={place.text}>
              {/* {ICONS[]} */}
              <p>{place.text}</p>
              <p>{place.moreInfo}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Area;
