import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import getHotelDetails from '../../api/getHotelDetails';
import Image from './Image/Image';
import Details from './Details/Details';
import Rooms from './Rooms/Rooms';
import NavTitle from './NavTitle/NavTitle';
import About from './About/About';

const Hotel = () => {
  const [hotel, setHotel] = useState();
  const location = useLocation();

  useEffect(() => {
    const getHotel = async () => {
      const hotel = await getHotelDetails(location.pathname.split('/')[2]);
      setHotel(hotel);
    };

    getHotel();
  }, []);

  return (
    <>
      {hotel && (
        <div className='w-full flex justify-center items-center mt-8 mb-40'>
          <div className='w-[60vw]'>
            <Image
              images={hotel.property.propertyGallery.images}
              title={hotel.property.summary.name}
            />
            <NavTitle />
            <Details hotel={hotel.property} />
            {/* <Rooms rooms={hotel.rooms} /> */}
            <hr className='opacity-20 my-10' />
            <About about={hotel.about} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hotel;
