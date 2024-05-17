import React from 'react';
import uniqid from 'uniqid';
import classes from './Modal.module.css';

const Modal = (props) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>{props.title}</h3>
          <i
            className={`fa-regular fa-circle-xmark ${classes.icon}`}
            name='close'
            onClick={props.modalToggle}
          />
        </div>

        {/* Image List */}

        <h1 className={classes.imageHeader}>All Photos</h1>
        <section className={classes.imageTile}>
          {props.images.map((image) => {
            const url = image.image.url + '&rw=1200';
            return (
              <div className={classes.image}>
                <img src={url} loading='eager' alt='' key={uniqid()} />
                {image.image.description}
              </div>
            );
          })}
        </section>

        {/* Image List */}
      </div>
    </div>
  );
};

export default Modal;
