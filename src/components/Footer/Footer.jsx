import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div>
        <h4>Top Desination</h4>
        <p>Dubai</p>
        <p>Paris</p>
        <p>New York</p>
        <p>New Delhi</p>
        <p>Bangkok</p>
        <p>Amsterdam</p>
      </div>
      <div>
        <h4>Top Countries</h4>
        <p>Maldvies</p>
        <p>Sri Lanka</p>
        <p>Singapore</p>
        <p>India</p>
        <p>Mauritius</p>
      </div>
      <div>
        <h4>Support</h4>
        <p>Your bookings</p>
        <p>FAQs</p>
        <p>Contact Us</p>
        <p>Review a Property</p>
      </div>
      <div>
        <h4>Policies</h4>
        <p>Terms and Conditions</p>
        <p>Privacy</p>
        <p>Cookies</p>
      </div>
      <div>
        <h4>For Affiliates and Media</h4>
        <p>Affiliate</p>
        <p>Hotelo Partner Solutions</p>
        <p>Promote With Us</p>
      </div>
    </div>
  );
};

export default Footer;
