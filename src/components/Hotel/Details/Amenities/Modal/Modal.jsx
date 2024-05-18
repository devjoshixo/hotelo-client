import Reactxs from 'react';
import uniqid from 'uniqid';
import classes from './Modal.module.css';

const Modal = (props) => {
  console.log(props.amenities);
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>Property Amenities</h3>
          <i
            className={`fa-regular fa-circle-xmark ${classes.icon}`}
            name='close'
            onClick={props.onToggle}
          />
        </div>
        <section className={classes.imageTile}>
          <div className={classes.bodywrapper}>
            {props.amenities.takeover.highlight[0].items.map((item, index) => {
              return (
                <div className={classes.amenities} key={uniqid()}>
                  {props.ICONS[item.icon.id]}
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal;
