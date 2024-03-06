const loginUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(user);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
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
