import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import getHotelDetails from '../../api/getHotelDetails';

const Hotel = () => {
  const [hotel, setHotel] = useState();
  const location = useLocation();

  useEffect(() => {
    const getHotel = async () => {
      const hotel = await getHotelDetails(location.pathname.split('/')[2]);
      setHotel(hotel.property);
    };

    getHotel();
    // console.log(hotel.propertyGallery.images);
  }, []);

  return (
    <div>
      {hotel && (
        <div>
          {hotel.propertyGallery.images.map((image) => {
            return <img src={image.image.url} alt='' key={uniqid()} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Hotel;
