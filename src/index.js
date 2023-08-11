import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

const selectBreed = document.querySelector('.breed-select');

fetchBreeds()
  .tnen(breeds => {
    createMarkupBreedsSelect(breeds);
  })
  .catch(err => console.error(err));

function createMarkupBreedsSelect(breeds) {
  const markupSelectBreeds = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join(' ');

  selectBreed.innerHTML = markupSelectBreeds;
  selectBreed.style.visibility = 'inherit';
  new SlimSelect({
    select: '.breed-select',
  });
}
