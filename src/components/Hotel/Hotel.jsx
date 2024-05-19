import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import getHotelDetails from '../../api/getHotelDetails';
import classes from './Hotel.module.css';
import Image from './Image/Image';
import Details from './Details/Details';

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
          <div className={classes.subwrapper}>
            {' '}
            <Image
              images={hotel.propertyGallery.images}
              title={hotel.summary.name}
            />
            <Details hotel={hotel} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hotel;
