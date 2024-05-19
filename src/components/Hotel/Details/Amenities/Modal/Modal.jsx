import Reactxs from 'react';
import uniqid from 'uniqid';
import classes from './Modal.module.css';

const Modal = (props) => {
  // console.log(props.amenities);
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
          <div>
            Popular Amenities
            <div className={classes.bodywrapper}>
              {props.amenities.takeover.highlight[0].items.map(
                (item, index) => {
                  return (
                    <div className={classes.amenities} key={uniqid()}>
                      {props.ICONS[item.icon.id]}
                      <p>{item.text}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {props.amenities.takeover.property.map((property) => {
            return (
              <div className={classes.property}>
                <h3 className={classes.heading}>{property.header.text}</h3>
                <ul>
                  {property.items.map((item) => {
                    return <li>{item.text}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Modal;
