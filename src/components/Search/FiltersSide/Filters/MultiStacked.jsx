import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import QueryContext from '../../../../context/QueryContext';

const MultiStacked = (props) => {
  const ctx = useContext(QueryContext);

  const [selected, setSelected] = useState(
    ctx.parameters[props.item.tileMultiSelectionOptions[0].id] || []
  );

  const toggleSelection = (event, id) => {
    const name = event.target.getAttribute('name');
    if (selected.includes(name)) {
      const obj = selected.filter((item) => {
        if (item == name) {
        } else {
          return item;
        }
      });
      if (obj.length == 0) {
        ctx.queryDelete(id);
        return;
      }
      ctx.queryAdder(id, obj);
    } else {
      ctx.queryAdder(id, [...selected, name]);
    }
  };

  return (
    <div className='flex flex-row flex-wrap w-auto gap-[0.3rem] mt-[0.4rem]'>
      {props.item.tileMultiSelectionOptions.map((item) => {
        return (
          <div
            className={`border-2 border-[#47474774] p-[0.3rem] px-[0.6rem] text-center text-[0.9rem] rounded-[10px] min-w-[2.2rem] hover:bg-[#ecf4fd] ${
              selected.includes(item.value)
                ? 'bg-[#ecf4fd] border-2 border-[black]'
                : ''
            }`}
            key={uniqid()}
            name={item.value}
            onClick={() => toggleSelection(event, item.id)}
          >
            {item.primary}
            {item.icon.id == 'star' ? (
              <i
                className='fa-solid fa-star'
                name={item.value}
                style={{ transform: 'scale(0.8)' }}
              ></i>
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiStacked;
