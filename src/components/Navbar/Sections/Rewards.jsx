import React, { useState } from 'react';
import classes from './Rewards.module.css';

const Rewards = () => {
  const [modal, setModal] = useState(false);

  return (
    <div
      className={classes.header}
      onMouseEnter={() => {
        setModal(true);
      }}
      onMouseLeave={() => {
        setModal(false);
      }}
      name='icon'
    >
      <div className={classes.rewards}>
        More travel
        <i className={`fa-solid fa-caret-down ${classes.down}`} name='icon'></i>
      </div>
      {modal ? <div className={classes.floater}>Hotelo.com® Rewards</div> : ''}
    </div>
  );
};

export default Rewards;
