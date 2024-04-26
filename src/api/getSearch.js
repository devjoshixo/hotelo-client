const getSearch = async (token, login) => {
  var requestOptions = {
    method: 'GET',
    headers: {
      'api-key': import.meta.env.VITE_REACT_APP_API_KEY,
      token,
      login,
    },
    redirect: 'follow',
  };

  const data = await fetch(
    import.meta.env.VITE_REACT_APP_API_URL + '/api/hotels/search',
    requestOptions
  );
  if (data.status == 401) {
    return { error: true };
  }
  const result = await data.json();
  return result;
};

export default getSearch;
