import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import LogoSection from './Sections/LogoSection';
import Rewards from './Sections/Rewards';
import AuthContext from '../../context/AuthContext';
import Account from './Sections/Account';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const ctx = useContext(AuthContext);

  return (
    <div className={classes.navbar}>
      <header className={classes.section}>
        <LogoSection />
        <Rewards />
      </header>

      <header className={classes.section}>
        <p className={classes.rightbar}>
          <i className='fa-solid fa-earth-americas'></i> English
        </p>
        <p className={classes.rightbar}>List your property</p>
        <p className={classes.rightbar}>Support</p>
        <p className={classes.rightbar}>Trips</p>

        <div
          onMouseEnter={() => {
            setModal(true);
          }}
          onMouseLeave={() => {
            setModal(false);
          }}
        >
          <Account classes={classes.rightbar} />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
