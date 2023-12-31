import React, { useContext } from 'react';
import classes from './ProductTile.module.css';
import { useHistory } from 'react-router-dom';
import hoteldata from '../../../helper/hoteldata';
import Heart from '../../UI/Heart';

const ProductTile = (props) => {
  const hotel = props.hotel;
  const name = hotel.name.split(' ');
  const navigation = useHistory();

  const clickHandler = (event) => {
    localStorage.setItem('hotelData', JSON.stringify(hotel));
    navigation.push(`/hotel/details?id=${hotel.id}`);
  };

  return (
    <>
      <div className={classes.productcard}>
        <div className={classes.imagecard}>
          <img src={hotel.url} onClick={clickHandler} />
          <Heart />
        </div>
        <div className={classes.infocard} onClick={clickHandler}>
          <div>
            <h3 className={classes.name}>{name[0] + ' ' + name[1]}</h3>
            <p className={classes.info}>
              {hotel.destinationValue + ' ' + hotel.destinationUnit}
              away
            </p>
            <p className={classes.price}>
              {hotel.price}{' '}
              {hotel.originalPrice ? (
                <s className={classes.cutout}>
                  <i>{hotel.originalPrice}</i>
                </s>
              ) : (
                ''
              )}
            </p>
          </div>
          <div className={classes.rating}>
            <p>{hotel.star}</p>
            <i
              className='fa-solid fa-star'
              style={{ color: '#000000', margin: '1.2rem 0.3rem 0 0' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTile;
