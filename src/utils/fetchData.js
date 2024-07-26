export const exerciseOptions = {
  method: 'GET',
	hostname: 'exercisedb.p.rapidapi.com',
	port: null,
	path: '/exercises/bodyPart/back?limit=10&offset=0',
	headers: {
		'x-rapidapi-key': '07604365e0msh9c6daec8d946547p16d05ajsn3c440989a621',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '6b14f01acamshaab86d1944a63d1p1fd522jsn040a6d9bf0a0',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};