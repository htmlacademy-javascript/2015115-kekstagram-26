const FROM_SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram/data';
const TO_SERVER_DATA = 'https://26.javascript.pages.academy/kekstagram';

let userData;

const getRawDataFromServer = (data) => {
  userData = data;
  return userData;
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
export { getRawDataFromServer, userData };
export { getData, sendData };
