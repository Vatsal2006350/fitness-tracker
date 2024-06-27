export const exerciseOptions = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
  headers: {
    'x-rapidapi-key': 'f324d57ac4msh604dbd696ecc0b4p1946bfjsnb4eaaf57ebde',
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
export const fetchData = async( url, options) => {
const response = await fetch(url, options);
const data = await response.json();

return data;

}
