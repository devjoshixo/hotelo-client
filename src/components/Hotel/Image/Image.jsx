import React, { useState, useEffect } from 'react';
import classes from './Image.module.css';
import uniqid from 'uniqid';

const Image = (props) => {
  const [modal, setModal] = useState(false);
  const modalToggle = (event) => {
    let value = true;
    if (event.target.getAttribute('name') == 'close') {
      value = false;
    }
    setModal((prevState) => {
      return value;
    });
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.imageWrapper} onClick={modalToggle}>
      <div className={classes.largeImage}>
        <img src={props.images[0].image.url} alt='' key={uniqid()} />
      </div>
      <div className={classes.smallImage}>
        {props.images.map((image, index) => {
          if (index > 4) {
            return;
          }

          if (index > 0) {
            return <img src={image.image.url} alt='' key={uniqid()} />;
          }
        })}
      </div>
      <div className={classes.imageLength}>
        <i className='fa-regular fa-images'></i>
        {props.images.length - 1}+
      </div>

      {/*  */}
      {/* Modal */}
      {modal && (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <div className={classes.header}>
              <h3>{props.title}</h3>
              <i
                className={`fa-regular fa-circle-xmark ${classes.icon}`}
                name='close'
                onClick={modalToggle}
              />
            </div>

            {/* Image List */}

            <h1 className={classes.imageHeader}>All Photos</h1>
            <section className={classes.imageTile}>
              {props.images.map((image) => {
                return (
                  <div className={classes.image}>
                    <img src={image.image.url} alt='' key={uniqid()} />
                    {image.image.description}
                  </div>
                );
              })}
            </section>

            {/* Image List */}
          </div>
        </div>
      )}
      {/* Modal */}
      {/*  */}
    </div>
  );
};

export default Image;
