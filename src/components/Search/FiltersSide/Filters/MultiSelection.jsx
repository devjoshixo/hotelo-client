import React, { useState, useEffect, useContext } from 'react';
import QueryContext from '../../../../context/QueryContext';
import Checkbox from '@mui/material/Checkbox';
import uniqid from 'uniqid';

const MultiSelection = (props) => {
  const [toggleHide, setToggleHide] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const ctx = useContext(QueryContext);
  const [selected, setSelected] = useState(
    ctx.parameters[props.item.multiSelectionOptions[0].id] || []
  );

  useEffect(() => {
    if (props.item.primary == 'Popular filters') {
      let obj = [];
      props.item.multiSelectionOptions.filter((section) => {
        const arr = ctx.parameters[section.id];
        if (arr && arr.includes(section.value)) {
          obj = [...obj, section.value];
        }
      });

      setSelected(obj);
    }
    if (props.item.primary != 'Popular filters') {
      if (props.item.multiSelectionOptions.length > 4) {
        setToggleHide(true);
        setShowButton(true);
      }
    }
  }, []);

  const onToggleList = () => {
    setToggleHide((prevState) => !prevState);
  };

  const checkedBox = (event, filter) => {
    if (event.target.checked) {
      ctx.queryAdder(filter.id, [...selected, `${filter.value}`]);
    } else {
      const obj = selected.filter((item) => {
        if (item == filter.value) {
        } else {
          return item;
        }
      });
      if (obj.length == 0) {
        ctx.queryDelete(filter.id);
        return;
      }
      ctx.queryAdder(filter.id, obj);
    }
  };

  return (
    <div className='flex flex-col justify-start items-start gap-0 w-full'>
      {props.item.multiSelectionOptions.map((filter, index) => {
        if (filter.id == 'poi') {
          return;
        }

        if (
          props.item.primary != 'Popular filters' &&
          toggleHide &&
          index > 4
        ) {
          return;
        }

        return (
          <div className='flex items-center text-[0.9rem]' key={uniqid()}>
            <Checkbox
              onClick={() => {
                checkedBox(event, filter);
              }}
              checked={selected.includes(filter.value)}
              sx={{
                backgroundColor: 'white',
                padding: '4px 0',
                paddingRight: '3px',
                '& .MuiSvgIcon-root': { fontSize: 23 },
              }}
            />
            <p className='m-0'>{filter.primary}</p>
          </div>
        );
      })}
      {showButton && (
        <div
          className='bg-[white] border-none text-[blue] text-[0.9rem] font-[Arial, Helvetica, sans-serif] ml-4 hover:underline'
          onClick={onToggleList}
        >
          {toggleHide ? 'See more' : 'Hide'}
        </div>
      )}
    </div>
  );
};

export default MultiSelection;
