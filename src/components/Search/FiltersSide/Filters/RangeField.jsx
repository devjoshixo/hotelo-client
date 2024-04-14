import React, { useEffect, useState } from 'react';
import classes from './RangeField.module.css';

const RangeField = (props) => {
  const MIN = props.item.range.characteristics.min;
  const MAX = props.item.range.characteristics.max;
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const formatNumberIndian = (number) => {
      const numberString = String(number);
      const parts = numberString.split('.');
      let integerPart = parts[0];
      const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

      let formattedInteger = '';
      let count = 0;
      let thousandReached = false;

      if (numberString.length <= 3) {
        formattedInteger = numberString;
      } else {
        for (let i = integerPart.length - 1; i >= 0; i--) {
          formattedInteger = integerPart[i] + formattedInteger;
          count++;
          if (count === 3 && !thousandReached && i !== 0) {
            formattedInteger = ',' + formattedInteger;
            count = 0;
          }
          if (count === 4 && i > 0 && !thousandReached) {
            formattedInteger = ',' + formattedInteger;
            count = 0;
            thousandReached = true;
          }
        }
      }
      if (formattedInteger == '28,000') {
        formattedInteger = '28,000+';
      }
      return '₹' + formattedInteger;
    };
    setPrice((prevState) => {
      return {
        min: {
          display: formatNumberIndian(MIN),
          value: MIN,
        },
        max: {
          display: formatNumberIndian(MAX),
          value: MAX,
        },
      };
    });
  }, []);

  const inputDivce = () => {};

  return (
    <div className={classes.price}>
      {price && (
        <>
          <div>
            <input
              type='text'
              name='min'
              value={price.min.display}
              onChange={inputDivce}
            />
          </div>
          <div>
            <input
              type='text'
              name='max'
              value={price.max.display}
              onChange={inputDivce}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RangeField;
