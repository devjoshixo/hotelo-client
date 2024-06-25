import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoSection from './Sections/LogoSection';
import Rewards from './Sections/Rewards';
import AuthContext from '../../context/AuthContext';
import Account from './Sections/Account';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const ctx = useContext(AuthContext);

  return (
    <div className='max-w-full text-[15px] flex flex-row justify-around items-center px-6 py-2 border-b border-nav-border '>
      <header className='flex flex-row gap-12 items-center justify-between'>
        <LogoSection />
        <Rewards />
      </header>

      <header className='flex flex-row gap-12 items-center justify-between'>
        <p className='cursor-pointer text-[#2f5b85] hover:text-[black]'>
          <i className='fa-solid fa-earth-americas'></i> English
        </p>
        <p className='cursor-pointer text-[#2f5b85] hover:text-[black]'>
          List your property
        </p>
        <p className='cursor-pointer text-[#2f5b85] hover:text-[black]'>
          Support
        </p>
        <p className='cursor-pointer text-[#2f5b85] hover:text-[black]'>
          Trips
        </p>

        <div
          onMouseEnter={() => {
            setModal(true);
          }}
          onMouseLeave={() => {
            setModal(false);
          }}
        >
          <Account />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
