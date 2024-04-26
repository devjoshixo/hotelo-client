import React, { useRef } from 'react';
import classes from './Destinations.module.css';

const DESTINATION_ARRAY = [
  {
    name: 'Singapore',
    country: 'Singapore',
    link: 'https://mediaim.expedia.com/destination/7/d00990d5f421c142385f606cf7c878c0.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Hong Kong',
    country: 'Hong Kong SAR',
    link: 'https://mediaim.expedia.com/destination/7/dac75899603bf2fb367f384a692486c3.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Seminyak',
    country: 'Indonesia',
    link: 'https://mediaim.expedia.com/destination/1/17cb88f7e585fe0dee98b9fcc0f02be5.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Paris',
    country: 'France',
    link: 'https://mediaim.expedia.com/destination/7/0fafab7fb7f1bbc162ee5066e0971095.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Ubud',
    country: 'Indonesia',
    link: 'https://mediaim.expedia.com/destination/1/74c63fd558e9c225db8a5b1b6b87f9a1.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Chennai',
    country: 'India',
    link: 'https://mediaim.expedia.com/destination/1/9d2f38a494b74bdb645d9901aaeef02e.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Bhubaneshwar',
    country: 'India',
    link: 'https://mediaim.expedia.com/destination/2/124f3952b59a2804712fbaddd7dc2e94.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
  {
    name: 'Ujjain',
    country: 'India',
    link: 'https://mediaim.expedia.com/destination/2/ebddb86e57e3d64b2616534ff0b9f349.jpg?impolicy=fcrop&w=1000&h=563&p=1&q=medium',
  },
];

const Destinations = () => {
  const elementRef = useRef(null);

  const carouselHandler = (event) => {
    event.preventDefault();
    const move = 1000;
    const name = event.target.getAttribute('name');
    if (name == 'left') {
      if (elementRef.current.scrollLeft > move) {
        elementRef.current.scrollLeft -= move;
      } else {
        elementRef.current.scrollLeft = 0;
      }
    } else if (name == 'right') {
      elementRef.current.scrollLeft += move;
    }
  };

  return (
    <div className={classes.container}>
      <button
        className={`${classes.icon} ${classes.left}`}
        name='left'
        onClick={carouselHandler}
      >
        <i className='fa-solid fa-arrow-left' name='left'></i>
      </button>
      <h1 className={classes.header}>Explore stays in trending destinations</h1>
      <div className={classes.list} ref={elementRef}>
        {DESTINATION_ARRAY.map((item) => {
          return (
            <div className={classes.wrapper} key={item.name}>
              <img src={item.link} alt={item.name} />
              <div className={classes.name}>
                <h3>{item.name}</h3>
                <p>{item.country}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className={`${classes.icon} ${classes.right}`}
        name='right'
        onClick={carouselHandler}
      >
        <i className='fa-solid fa-arrow-right' name='right'></i>
      </button>
    </div>
  );
};

export default Destinations;
