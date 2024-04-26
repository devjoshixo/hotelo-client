const getHotelDetails = async () => {
  var requestOptions = {
    method: 'GET',
    headers: { 'api-key': import.meta.env.VITE_REACT_APP_API_KEY },
    redirect: 'follow',
  };

  const data = await fetch(
    import.meta.env.VITE_REACT_APP_API_URL + '/api/hotels/getHotelDetails',
    requestOptions
  );
  const result = await data.json();
  return result;
};

export default getHotelDetails;
