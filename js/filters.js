import { getThumbnailRenderedPictures, usersPicturesContainer } from './thumbnail-rendering.js';
import { shuffle, debounce } from './util.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const imgFiltersForm = imgFiltersContainer.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;

let forFiltersData;

const getDataForFilters = (data) => {
  forFiltersData = data;
};

const removePictureNodesFromFilter = () => {
  const smallPictures = usersPicturesContainer.querySelectorAll('a');
  smallPictures.forEach( (node) => node.remove() );
};

const imgFiltersButtonsChangeHandler = (evt) => {
  const currentButton = evt.target;
  imgFiltersButtons.forEach( (btn) => btn.classList.remove('img-filters__button--active') );
  currentButton.classList.add('img-filters__button--active');
  switch (currentButton.id) {
    case 'filter-random':
      removePictureNodesFromFilter();
      debounce(getThumbnailRenderedPictures( shuffle(forFiltersData).slice(0, RANDOM_PICTURES_NUMBER) ), RERENDER_DELAY);
      break;
    case 'filter-discussed':
      removePictureNodesFromFilter();
      debounce(getThumbnailRenderedPictures( forFiltersData.slice().sort( (a,b) => b.comments.length - a.comments.length) ), RERENDER_DELAY);
      break;
    default:
      removePictureNodesFromFilter();
      debounce(getThumbnailRenderedPictures(forFiltersData), RERENDER_DELAY);
      break;
  }
};

const imgFiltersButtonsHandler = () => {
  imgFiltersButtons.forEach( (button) => {
    button.addEventListener('click', imgFiltersButtonsChangeHandler);
  } );
};

const showFilters = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
};

const useFilters = () => {
  imgFiltersButtonsHandler();
};

export { showFilters, useFilters, getDataForFilters };

/* debounce(getThumbnailRenderedPictures( shuffle(forFiltersData.slice(RANDOM_PICTURES_NUMBER) )  ), RERENDER_DELAY); */
