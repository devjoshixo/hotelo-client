const getSearch = async (token, logged_in) => {
  var requestOptions = {
    method: 'GET',
    headers: {
      'api-key': import.meta.env.VITE_REACT_APP_API_KEY,
      token,
      logged_in,
    },
    redirect: 'follow',
  };

  const data = await fetch(
    import.meta.env.VITE_REACT_APP_API_URL + '/api/hotels/search',
    requestOptions
  );
  const result = await data.json();
  return result;
};

export default getSearch;
