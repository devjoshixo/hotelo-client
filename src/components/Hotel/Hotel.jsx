import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import getHotelDetails from '../../api/getHotelDetails';
import classes from './Hotel.module.css';
import Image from './Image/Image';

const Hotel = () => {
  const [hotel, setHotel] = useState();
  const location = useLocation();

  useEffect(() => {
    const getHotel = async () => {
      const hotel = await getHotelDetails(location.pathname.split('/')[2]);
      setHotel(hotel.property);
    };

    getHotel();
  }, []);

  return (
    <>
      {hotel && (
        <div className={classes.wrapper}>
          <Image images={hotel.propertyGallery.images} />
        </div>
      )}
    </>
  );
};

export default Hotel;
