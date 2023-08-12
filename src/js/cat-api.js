import axios from 'axios';

const API_KEY =
  'live_xbN79sxzHqWnghYNIEyaWFZjrnAQFN9cK2h3aDLYLWoED91X6hGOb47jzfE3P0rm';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(url).then(responce => responce.data);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url).then(responce => responce.data);
}
