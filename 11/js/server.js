import { getUserData } from './fullsize-rendering.js';
import { getThumbnailRenderedPictures } from './thumbnail-rendering.js';
import { showFilters, getDataForFilters, useFilters } from './filters.js';

const FROM_SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram/data';
const TO_SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram';

const getRecievedData = (data) => {
  getUserData(data);
  getDataForFilters(data);
  getThumbnailRenderedPictures(data);
  setTimeout(showFilters, 300);
  useFilters();
};

const getData = (onSuccess, onFail) => {
  fetch(FROM_SERVER_DATA)
    .then( (response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then( (pictures) => {
      onSuccess(pictures);
    })
    .catch( () => {
      onFail('Извините, не удалось получить данные. Попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, userForm) => {
  fetch(
    TO_SERVER_DATA,
    {
      method: 'POST',
      body: userForm,
    },
  )
    .then( (response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch( () => {
      onFail();
    });
};

export { getData, sendData, getRecievedData };
