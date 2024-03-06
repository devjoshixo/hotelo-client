import React from 'react';
import classes from './Lodging.module.css';
import apartment from '../../../assets/apartment.svg';

const LIST_ICONS = [
  'building',
  'warehouse',
  'ship',
  'house-chimney',
  'umbrella-beach',
  'infinity',
  'spa',
  'house-user',
  'paw',
  'hot-tub-person',
  'water',
  'people-roof',
];
const SUBTEXT = [
  ['Apart-', 'ment'],
  ['Villa'],
  ['House-', 'boat'],
  ['Cottage'],
  ['Resort'],
  ['All inclu-', 'sive'],
  ['Spa'],
  ['Apart ho-', 'tel'],
  ['Pet', 'friendly'],
  ['Hot tub'],
  ['Sea view'],
  [['Family'], ['friendly']],
];

const Lodging = () => {
  return (
    <div className={classes.lodging}>
      <h1 className={classes.header}>Discover your new favourite stay</h1>
      <div className={classes.list}>
        {LIST_ICONS.map((icon, index) => {
          return (
            <div className={classes.wrapper} key={icon}>
              <div className={classes.icon}>
                <i className={`fa-solid fa-${icon}`}></i>
              </div>
              <div>
                {SUBTEXT[index].map((i) => {
                  return (
                    <p className={classes.subtext} key={i}>
                      {i}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lodging;
