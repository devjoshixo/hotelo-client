const loginUser = async (user) => {
  var raw = JSON.stringify(user);

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
    import.meta.env.VITE_REACT_APP_API_URL + '/api/user/login',
    requestOptions
  );
  return response;
};

export default loginUser;
