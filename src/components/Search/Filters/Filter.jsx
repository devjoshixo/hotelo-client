import React, { useState } from 'react';

const Filter = (props) => {
  const [filter, setFilter] = useState(props.filter[1]);
  console.log(filter);
  return <div>{filter.title}</div>;
};

export default Filter;
