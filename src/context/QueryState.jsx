import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom';
import QueryContext from './QueryContext';

const QueryState = (props) => {
  const [parameters, setParameters] = useState({});
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setParameters(Object.fromEntries(new URLSearchParams(location.search)));
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

  const queryDelete = (name) => {
    let search = Object.fromEntries(new URLSearchParams(location.search));
    delete search[name];
    history.replace({
      search: new URLSearchParams({ ...search, [name]: value }).toString(),
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
