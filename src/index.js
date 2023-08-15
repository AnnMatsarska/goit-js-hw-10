import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');

selectBreed.addEventListener('change', onCatBreedSelect);

function createMarkupBreedsSelect(breeds) {
  const markupSelectBreeds = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join(' ');

  selectBreed.innerHTML = markupSelectBreeds;

  selectBreed.style.visibility = 'inherit';
  new SlimSelect({
    select: '#js-select',
  });
}

function createMarkupCard(data) {
  const markupSelectCat = el => {
    return `<h1>${el.breeds[0].name}</h1>
    <p><strong>Description: </strong>${el.breeds[0].description}</p>
    <p><strong>Temperament: </strong>${el.breeds[0].temperament}</p>
    <img src="${el.url}" alt="${el.breeds[0].name}"></img>`;
  };

  container.innerHTML = markupSelectCat(data[0]);
}

function onCatBreedSelect(evt) {
  Notiflix.Loading.circle('Loading data, please wait...');

  container.innerHTML = '';

  const breedOption = fetchCatByBreed(evt.target.value);

  breedOption
    .then(data => {
      createMarkupCard(data);
      Notiflix.Loading.remove();
    })
    .catch(err => errorMessage(err));

  // loader.classList.remove('is-hidden');
  // error.classList.add('is-hidden');
}

Notiflix.Loading.circle('Loading data, please wait...');

fetchBreeds()
  .then(breeds => {
    createMarkupBreedsSelect(breeds);
    Notiflix.Loading.remove();
    // loader.classList.add('is-hidden');
  })
  .catch(err => errorMessage(err));

function errorMessage() {
  Notiflix.Loading.remove();
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  // loader.classList.add('is-hidden');
  // error.classList.remove('is-hidden');
}
