import { isEscapeKey, validateLength, findIdenticalItem } from './util.js';
import { scalesControlButtonHandler, explodeUserPictureSettings } from './picture-scale.js';
import { scaleControlBiggerElement, scaleControlSmallerElement, getScaleIncrease, getScaleDecrease } from './picture-scale.js';
import { inputEffectsRadioElementsHandler, resetImgUploadSettings } from './slider-effect.js';
import { sendData } from './server.js';

const wholeFormElement = document.querySelector('.img-upload__wrapper');
const form = wholeFormElement.querySelector('.img-upload__form');
const imgUploadFieldset = form.querySelector('.img-upload__start');
const imgInputElement = imgUploadFieldset.querySelector('#upload-file');
const imgUploadOverlayElement = form.querySelector('.img-upload__overlay');
const imgUploadTextFieldsElement = form.querySelector('.img-upload__text');
const hashtagFieldElement = imgUploadTextFieldsElement.querySelector('.text__hashtags');
const commentFieldElement = imgUploadTextFieldsElement.querySelector('.text__description');
const closeButtonOverlayElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
const uploadFormSubmitButtonElement = form.querySelector('.img-upload__submit');

const REG_EXP_HASHTAG = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_COUNT = 5;
const MAX_HASHTAG_FIELD_SYMBOLS = 104;

//Блокировка и разблокировка кнопки сабмита

const blockSubmitButtonElement = () => {
  uploadFormSubmitButtonElement.disabled = true;
  uploadFormSubmitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButtonElement = () => {
  uploadFormSubmitButtonElement.disabled = false;
  uploadFormSubmitButtonElement.textContent = 'Сохранить';
};

//Сообщение об успешной загрузке

const closeSuccessMessageModalEsc = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    hideSuccessMessageModal();
  }
};

function hideSuccessMessageModal () {
  document.removeEventListener('keydown', closeSuccessMessageModalEsc);
  document.removeEventListener('click', hideSuccessMessageModal);
  document.body.lastChild.remove();
}

const checkClickAwayFromSuccessMessageModal = (evt) => {
  const currentElement = evt.target;
  if( !currentElement.closest('.success__inner') ) {
    hideSuccessMessageModal();
  }
};

const showSuccessMessageModal = () => {
  const successModal = document.querySelector('#success').content;
  const clonedSuccessModal = successModal.cloneNode(true);
  const closeSuccessModalButtonElement = clonedSuccessModal.querySelector('.success__button');
  closeSuccessModalButtonElement.addEventListener('click', hideSuccessMessageModal);
  document.addEventListener('keydown', closeSuccessMessageModalEsc);
  document.addEventListener('click', checkClickAwayFromSuccessMessageModal);
  document.body.append(clonedSuccessModal);
  closeUploadOverlay();
};

// Сообщение об ошибке загрузки

const hideErrorMessageModalEsc = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    hideErrorMessageModal();
  }
};

function hideErrorMessageModal () {
  document.removeEventListener('keydown', );
  document.removeEventListener('click', );
  document.body.lastChild.remove();
}

const checkClickAwayFromErrorMessageModal = (evt) => {
  const currentElement = evt.target;
  if( !currentElement.closest('.error__inner') ) {
    hideErrorMessageModal();
  }
};

const showErrorMessageModal = () => {
  const errorModal = document.querySelector('#error').content;
  const clonedErrorModal = errorModal.cloneNode(true);
  const errorButtonElement = clonedErrorModal.querySelector('.error__button');
  errorButtonElement.addEventListener('click', hideErrorMessageModal);
  document.addEventListener('keydown', hideErrorMessageModalEsc);
  document.addEventListener('click', checkClickAwayFromErrorMessageModal);
  document.body.append(clonedErrorModal);
  closeUploadOverlay();
};

//Local Storage

const clearLocalStorage = () => {
  localStorage.clear();
};

const formFields = [hashtagFieldElement, commentFieldElement];

const inputFieldsValuesChangeHandler = () => {
  formFields.forEach( (element) => {
    localStorage.setItem(element.name, element.value);
  });
};

const formElementsChangeHandler = () => {
  formFields.forEach( (element) => {
    element.addEventListener('change', inputFieldsValuesChangeHandler);
  });
};

const checkLocalStorageHandler = () => {
  formFields.forEach( (element) => {
    element.value = localStorage.getItem(element.name);
  });
  formElementsChangeHandler();
};

///////////////////////////////////////////////////////////

const explodeInputFieldsValues = () => {
  const pristineErrorElement = wholeFormElement.querySelector('.pristine-error');
  if (pristineErrorElement) {
    pristineErrorElement.style.display = 'none';
  }
  clearLocalStorage();
  imgInputElement.value = '';
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
  uploadFormSubmitButtonElement.disabled = false;
};

function closeButtonOverlayElementHandler (evt) {
  if( isEscapeKey(evt) ) {
    evt.preventDefault();
    closeUploadOverlay();
  }
}

const validateHashtagInput = () => {
  const rawHashtagFieldValues = hashtagFieldElement.value.toLowerCase().trim().replace(/\s/g, ' ').split(' ');
  const finalHashtagValues = [];
  rawHashtagFieldValues.forEach( (element) => {
    if (element !== '') {
      finalHashtagValues.push(element);
    }
  } );
  if ( findIdenticalItem(finalHashtagValues)
      && validateLength(finalHashtagValues, HASHTAGS_COUNT)
      && validateLength( finalHashtagValues.join(' '), MAX_HASHTAG_FIELD_SYMBOLS) ) {
    return finalHashtagValues.every( (element) => REG_EXP_HASHTAG.test(element) );
  } else {
    return false;
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper'
});

const setFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButtonElement();
    sendData (
      () => {
        closeUploadOverlay();
        clearLocalStorage();
        showSuccessMessageModal();
        unblockSubmitButtonElement();
      },
      () => {
        showErrorMessageModal();
        blockSubmitButtonElement();
      },
      new FormData(evt.target),
    );
  }
};

/*
const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButtonElement();
      sendData (
        () => {
          onSuccess();
          clearLocalStorage();
          showSuccessMessageModal();
          unblockSubmitButtonElement();
        },
        () => {
          showErrorMessageModal();
          blockSubmitButtonElement();
        },
        new FormData(evt.target),
      );
    }
  });
};
*/

const addPristineFormValidation = () => {
  if (validateHashtagInput()) {
    uploadFormSubmitButtonElement.disabled = false;
  } else {
    uploadFormSubmitButtonElement.disabled = true;
  }
};

pristine.addValidator(hashtagFieldElement, validateHashtagInput, 'Невалидный хэш-тег!');

function overlayElementHandler (evt) {
  evt.preventDefault();
  checkLocalStorageHandler();
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonOverlayElement.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', closeButtonOverlayElementHandler);
  hashtagFieldElement.addEventListener('input', addPristineFormValidation);
  form.addEventListener('submit', setFormSubmit);
  scalesControlButtonHandler(scaleControlBiggerElement, getScaleIncrease);
  scalesControlButtonHandler(scaleControlSmallerElement, getScaleDecrease);
  inputEffectsRadioElementsHandler();
  resetImgUploadSettings();
}

const removeEscapeFromInputFields = (element) => {
  element.addEventListener('focusin', () => {
    document.removeEventListener('keydown', closeButtonOverlayElementHandler);
  });
  element.addEventListener('focusout', () => {
    document.addEventListener('keydown', closeButtonOverlayElementHandler);
  });
};

const showImgUploader = () => {
  imgInputElement.addEventListener('click', overlayElementHandler);
  removeEscapeFromInputFields(commentFieldElement);
  removeEscapeFromInputFields(hashtagFieldElement);
};

function closeUploadOverlay () {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButtonOverlayElement.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', closeButtonOverlayElementHandler);
  imgInputElement.removeEventListener('click', overlayElementHandler);
  hashtagFieldElement.removeEventListener('input', addPristineFormValidation);
  form.removeEventListener('submit', setFormSubmit);
  scaleControlSmallerElement.removeEventListener('click', getScaleDecrease);
  scaleControlBiggerElement.removeEventListener('click', getScaleIncrease);
  explodeInputFieldsValues();
  explodeUserPictureSettings();
  showImgUploader();
}

export { showImgUploader, setFormSubmit, closeUploadOverlay };
