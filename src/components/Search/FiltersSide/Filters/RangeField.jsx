import React, { useEffect, useState, useRef } from 'react';
import classes from './RangeField.module.css';
import useOutsideClick from '../../../../hooks/UseOutsideClick';

const RangeField = (props) => {
  const MIN = props.item.range.characteristics.min;
  const MAX = props.item.range.characteristics.max;
  const [minPrice, setMinPrice] = useState({
    display: '₹0',
    value: 0,
    input: 0,
  });

  const [maxPrice, setMaxPrice] = useState({
    display: '₹28,000+',
    value: 28000,
    input: 0,
  });
  const [minRef, minVisible, SetMinVisible] = useOutsideClick();
  const [maxRef, maxVisible, SetMaxVisible] = useOutsideClick();

  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

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

  // //
  // //// Setting
  // useEffect(() => {
  //   setMinPrice((prevState) => {
  //     return
  //       {
  //         display: formatNumberIndian(MIN),
  //         value: MIN,
  //       }

  //     };
  //   );
  //   setMaxPrice((prevState) => {
  //     return {
  //         display: formatNumberIndian(MAX),
  //         value: MAX,
  //       }
  //   });
  // }, []);
  // //
  // ////

  useEffect(() => {
    if (minInputRef.current) {
      minInputRef.current.focus();
    } else if (maxInputRef.current) {
      maxInputRef.current.focus();
    }
  }, [minVisible, maxVisible]);

  const changeDisplayValue = (event, setPrice) => {
    const name = event.target.name;
    setPrice((prevState) => {
      let input = parseInt(prevState.input);

      if (name == 'min' && input > maxPrice.value) {
        return prevState;
      }
      if (name == 'max' && input < minPrice.value) {
        return prevState;
      }
      if (name == 'max' && input > 28000) {
        console.log('first');
        input = 28000;
      }
      console.log(input);
      return {
        input,
        value: input,
        display: formatNumberIndian(input),
      };
    });
  };

  const onClickHandler = (name) => {
    if (name == 'min') {
      setMinPrice((prevState) => {
        return { ...prevState, input: prevState.value };
      });
      SetMinVisible(true);
      minRef.current.focus();
    } else {
      setMaxPrice((prevState) => {
        return { ...prevState, input: prevState.value };
      });
      SetMaxVisible(true);
      maxRef.current.focus();
    }
  };

  const inputDivce = (event) => {
    const name = event.target.name;
    let number = event.target.value;
    if (number == '') {
      number = 0;
    }
    if (isNaN(number)) {
      return;
    }
    number = parseInt(number);
    if (name == 'min') {
      setMinPrice((prevState) => {
        return {
          ...prevState,
          input: number,
        };
      });
    } else if (name == 'max') {
      setMaxPrice((prevState) => {
        return {
          ...prevState,
          input: number,
        };
      });
    }
  };

  return (
    <div className={classes.price}>
      <>
        {/*  */}
        {/* Min Price Input */}
        <div
          className={classes.priceTag}
          onClick={() => {
            onClickHandler('min');
          }}
          ref={minRef}
        >
          <p>Min</p>

          {!minVisible ? (
            <div>{minPrice.display}</div>
          ) : (
            <input
              type='number'
              name='min'
              value={minPrice.input}
              onChange={inputDivce}
              onBlur={(event) => {
                changeDisplayValue(event, setMinPrice);
              }}
              onKeyPress={(event) => {
                if (event.key == 'Enter') {
                  SetMinVisible(false);
                  changeDisplayValue(event, setMinPrice);
                }
              }}
              ref={minInputRef}
            />
          )}
        </div>
        {/* Min Price Input */}
        {/*  */}

        {/*  */}
        {/* Max Price Input */}
        <div
          className={classes.priceTag}
          onClick={() => {
            onClickHandler('max');
          }}
          ref={maxRef}
        >
          <p>Max</p>

          {!maxVisible ? (
            <div>{maxPrice.display}</div>
          ) : (
            <input
              type='number'
              name='max'
              value={maxPrice.input}
              onChange={inputDivce}
              onBlur={(event) => {
                changeDisplayValue(event, setMaxPrice);
              }}
              ref={maxInputRef}
              onKeyPress={(event) => {
                if (event.key == 'Enter') {
                  SetMaxVisible(false);
                  changeDisplayValue(event, setMaxPrice);
                }
              }}
            />
          )}
        </div>
        {/* Max Price Input */}
        {/*  */}
      </>
    </div>
  );
};

export default RangeField;
