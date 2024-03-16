const checkEmail = async (email) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    email: email,
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

  const data = await fetch(
    import.meta.env.VITE_REACT_APP_API_URL + '/api/user/checkEmail',
    requestOptions
  );

  return data;
};

export default checkEmail;
