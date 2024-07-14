const getSearchList = async (search) => {
  const url =
    'https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_IN&domain=IN&';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c1f61d4401msh0f4fe0ec8cc9e71p1f81a9jsnfc3473339f0c',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url + 'query=' + search, options);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export default getSearchList;
