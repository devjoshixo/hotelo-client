const postSaveProperty = async (email, token, hotel) => {
  var raw = JSON.stringify({
    email,
    token,
    hotel,
  });

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': import.meta.env.VITE_REACT_APP_API_KEY,
    },
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_URL + '/api/user/postSaveProperty',
    requestOptions
  );
  const data = await response.json();

  return data;
};

export default postSaveProperty;
