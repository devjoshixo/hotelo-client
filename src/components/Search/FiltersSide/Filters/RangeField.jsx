import React, { useEffect, useState, useRef, useContext } from 'react';
import useOutsideClick from '../../../../hooks/UseOutsideClick';
import QueryContext from '../../../../context/QueryContext';

const RangeField = (props) => {
  const ctx = useContext(QueryContext);
  const MIN = props.item.range.characteristics.min;
  const MAX = props.item.range.characteristics.max;
  const [minPrice, setMinPrice] = useState({
    display: 'Loading',
    value: ctx.parameters['minPrice'] || MIN,
    input: 0,
  });

  const [maxPrice, setMaxPrice] = useState({
    display: 'Loading',
    value: ctx.parameters['maxPrice'] || MAX,
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

  useEffect(() => {
    setMinPrice((prevState) => {
      const value = prevState.value;
      return {
        value,
        display: formatNumberIndian(value),
        input: 0,
      };
    });

    setMaxPrice((prevState) => {
      const value = prevState.value;
      return {
        value,
        display: formatNumberIndian(value),
        input: 0,
      };
    });
  }, []);

  useEffect(() => {
    if (minInputRef.current) {
      minInputRef.current.focus();
    } else if (maxInputRef.current) {
      maxInputRef.current.focus();
    }
  }, [minVisible, maxVisible]);

  const changeDisplayValue = (event, price, nameTag) => {
    const name = event.target.name;
    let input = parseInt(price.input);

    if (name == 'min' && input > maxPrice.value) {
      return;
    }
    if (name == 'max' && input < minPrice.value) {
      return;
    }
    if (name == 'max' && input > 28000) {
      input = 28000;
    }
    props.queryAdder(nameTag, input);
    // setPrice((prevState) => {
    //   let input = parseInt(prevState.input);

    //   if (name == 'min' && input > maxPrice.value) {
    //     return prevState;
    //   }
    //   if (name == 'max' && input < minPrice.value) {
    //     return prevState;
    //   }
    //   if (name == 'max' && input > 28000) {
    //     input = 28000;
    //   }
    //   props.queryAdder(nameTag, input);
    //   return {
    //     input,
    //     value: input,
    //     display: formatNumberIndian(input),
    //   };
    // });
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
    <div className='flex gap-4'>
      <>
        {/*  */}
        {/* Min Price Input */}
        <div
          className='flex flex-col justify-center w-[5.5rem] p-[0.1rem_0_0.1rem_0.8rem] text-base border-[black] border rounded-[10px] h-12'
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
              className='w-20 text-base border-none rounded-[10px] h-12 focus:outline-none'
              value={minPrice.input}
              onChange={inputDivce}
              onBlur={(event) => {
                changeDisplayValue(event, minPrice, 'minPrice');
              }}
              onKeyPress={(event) => {
                if (event.key == 'Enter') {
                  SetMinVisible(false);
                  changeDisplayValue(event, minPrice, 'minPrice');
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
          className='flex flex-col justify-center w-[5.5rem] p-[0.1rem_0_0.1rem_0.8rem] text-base border-[black] border rounded-[10px] h-12'
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
              className='w-20 text-base border-none rounded-[10px] h-12 focus:outline-none'
              onChange={inputDivce}
              onBlur={(event) => {
                changeDisplayValue(event, maxPrice, 'maxPrice');
              }}
              ref={maxInputRef}
              onKeyPress={(event) => {
                if (event.key == 'Enter') {
                  SetMaxVisible(false);
                  changeDisplayValue(event, maxPrice, 'maxPrice');
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
