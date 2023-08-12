import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

const selectBreed = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');

selectBreed.addEventListener('change', onCatBreedSelect);

function onCatBreedSelect(evt) {
  container.innerHTML = '';

  const breedOption = fetchCatByBreed(evt.target.value);

  breedOption
    .then(data => createMarkupCard(data))
    .catch(err => console.error(err));
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

function createMarkupBreedsSelect(breeds) {
  const markupSelectBreeds = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join(' ');

  selectBreed.innerHTML = markupSelectBreeds;

  selectBreed.style.visibility = 'inherit';
  // new SlimSelect({
  //   select: '.breed-select',
  // });
  console.log(breeds);
}

fetchBreeds()
  .then(breeds => {
    createMarkupBreedsSelect(breeds);
  })
  .catch(err => console.error(err));
