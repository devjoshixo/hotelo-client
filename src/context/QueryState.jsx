import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom';
import QueryContext from './QueryContext';

const DEF_FUNCTION = [
  'destination',
  'startdate',
  'endDate',
  'minPrice',
  'maxPrice',
];

const QueryState = (props) => {
  const [parameters, setParameters] = useState({});
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let obj = Object.fromEntries(new URLSearchParams(location.search));
    for (let key in obj) {
      if (!DEF_FUNCTION.includes(key)) {
        let newArray = obj[key].split(',');
        obj[key] = newArray;
      }
    }

    setParameters(obj);
  }, [location.search]);

  //
  ////Adding a new query or replacing value for existing
  const queryAdder = (name, value) => {
    let search = Object.fromEntries(new URLSearchParams(location.search));
    history.replace({
      search: new URLSearchParams({ ...search, [name]: value }).toString(),
    });
    return;
  };

  //
  ////Deleting a query if it's empty
  const queryDelete = (name) => {
    let search = {};
    for (let key in parameters) {
      if (key == name) {
        continue;
      } else {
        search[key] = parameters[key];
      }
    }

    history.replace({
      search: new URLSearchParams(search).toString(),
    });
    return;
  };

  return (
    <QueryContext.Provider value={{ queryAdder, queryDelete, parameters }}>
      {props.children}
    </QueryContext.Provider>
  );
};

export default QueryState;
