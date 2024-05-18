import React, { useState, useEffect } from 'react';
import classes from './Image.module.css';
import uniqid from 'uniqid';
import Modal from './Modal/Modal';

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

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = modal ? 'hidden' : 'auto';
  }, [modal]);

  return (
    <div className={classes.imageWrapper} onClick={modalToggle}>
      <div className={classes.largeImage}>
        <img
          src={props.images[0].image.url + '&rw=1200'}
          loading='eager'
          alt=''
          key={uniqid()}
        />
      </div>
      <div className={classes.smallWrapper}>
        <div className={classes.smallImage}>
          <img
            src={props.images[1].image.url + '&rw=1200'}
            loading='eager'
            alt=''
            key={uniqid()}
          />
          <img
            src={props.images[2].image.url + '&rw=1200'}
            loading='eager'
            alt=''
            key={uniqid()}
          />
        </div>
        <div className={classes.smallImage}>
          <img
            src={props.images[3].image.url + '&rw=1200'}
            loading='eager'
            alt=''
            key={uniqid()}
          />
          <div className={classes.lastImage}>
            <img
              src={props.images[4].image.url + '&rw=1200'}
              loading='eager'
              alt=''
              key={uniqid()}
            />
            <div className={classes.imageLength}>
              <i className='fa-regular fa-images'></i>
              {props.images.length - 1}+
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          images={props.images}
          modalToggle={modalToggle}
          title={props.title}
        />
      )}
      {/* Modal */}
    </div>
  );
};

export default Image;
