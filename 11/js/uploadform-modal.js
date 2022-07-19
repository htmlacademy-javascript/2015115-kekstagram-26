import { isEscapeKey, validateLength, findIdenticalItem } from './util.js';
import { scalesControlButtonHandler, explodeUserPictureSettings } from './picture-scale.js';
import { scaleControlBiggerElement, scaleControlSmallerElement, getScaleIncrease, getScaleDecrease } from './picture-scale.js';
import { inputEffectsRadioElementsHandler, resetImgUploadSettings } from './slider-effect.js';
import { sendData } from './server.js';
import { imgInputElementHandler, imgInputElement } from './userpic-upload.js';

const wholeFormElement = document.querySelector('.img-upload__wrapper');
const form = wholeFormElement.querySelector('.img-upload__form');
const imgUploadOverlayElement = form.querySelector('.img-upload__overlay');
const imgUploadTextFieldsElement = form.querySelector('.img-upload__text');
const hashtagFieldElement = imgUploadTextFieldsElement.querySelector('.text__hashtags');
const commentFieldElement = imgUploadTextFieldsElement.querySelector('.text__description');
const closeButtonOverlayElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
const uploadFormSubmitButtonElement = form.querySelector('.img-upload__submit');

const REG_EXP_HASHTAG = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_COUNT = 5;
const MAX_HASHTAG_FIELD_SYMBOLS = 104;

const blockSubmitButtonElement = () => {
  uploadFormSubmitButtonElement.disabled = true;
  uploadFormSubmitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButtonElement = () => {
  uploadFormSubmitButtonElement.disabled = false;
  uploadFormSubmitButtonElement.textContent = 'Опубликовать';
};

const closeMessageModalEsc = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    hideMessageModal();
  }
};

const checkClickAwayFromMessageModal = (evt) => {
  const currentElement = evt.target;
  if( !currentElement.closest('.success__inner') || !currentElement.closest('.error__inner') ) {
    hideMessageModal();
  }
};

function hideMessageModal () {
  document.removeEventListener('keydown', closeMessageModalEsc);
  document.removeEventListener('click', checkClickAwayFromMessageModal);
  document.body.lastChild.remove();
  unblockSubmitButtonElement();
}

const showSuccessMessageModal = () => {
  const successModal = document.querySelector('#success').content.querySelector('.success');
  const clonedSuccessModal = successModal.cloneNode(true);
  const closeSuccessModalButtonElement = clonedSuccessModal.querySelector('.success__button');
  closeSuccessModalButtonElement.addEventListener('click', hideMessageModal);
  document.addEventListener('keydown', closeMessageModalEsc);
  document.addEventListener('click', checkClickAwayFromMessageModal);
  document.body.append(clonedSuccessModal);
};

const showErrorMessageModal = () => {
  const errorModal = document.querySelector('#error').content.querySelector('.error');
  const clonedErrorModal = errorModal.cloneNode(true);
  const errorButtonElement = clonedErrorModal.querySelector('.error__button');
  errorButtonElement.addEventListener('click', hideMessageModal);
  document.addEventListener('keydown', closeMessageModalEsc);
  document.addEventListener('click', checkClickAwayFromMessageModal);
  document.body.append(clonedErrorModal);
};

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

const explodeInputFieldsValues = () => {
  const pristineErrorElement = wholeFormElement.querySelector('.pristine-error');
  if (pristineErrorElement) {
    pristineErrorElement.style.display = 'none';
  }
  imgInputElement.value = '';
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
  uploadFormSubmitButtonElement.disabled = false;
};

function closeButtonOverlayElementHandler (evt) {
  if( isEscapeKey(evt) ) {
    evt.preventDefault();
    clearLocalStorage();
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
        clearLocalStorage();
        closeUploadOverlay();
        showSuccessMessageModal();
        unblockSubmitButtonElement();
      },
      () => {
        blockSubmitButtonElement();
        showErrorMessageModal();
        closeUploadOverlay();
      },
      new FormData(evt.target),
    );
  }
};

const addPristineFormValidation = () => {
  if (validateHashtagInput()) {
    uploadFormSubmitButtonElement.disabled = false;
  } else {
    uploadFormSubmitButtonElement.disabled = true;
  }
};

pristine.addValidator(hashtagFieldElement, validateHashtagInput, 'Невалидный хэш-тег!');

const closeByClickUploadOverlay = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  explodeInputFieldsValues();
  explodeUserPictureSettings();
  clearLocalStorage();
};

function overlayElementHandler () {
  checkLocalStorageHandler();
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonOverlayElement.addEventListener('click', closeByClickUploadOverlay);
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
  imgInputElement.addEventListener('change', overlayElementHandler);
  imgInputElement.addEventListener('change', imgInputElementHandler);
  removeEscapeFromInputFields(commentFieldElement);
  removeEscapeFromInputFields(hashtagFieldElement);
};

function closeUploadOverlay () {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButtonOverlayElement.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', closeButtonOverlayElementHandler);
  imgInputElement.removeEventListener('change', imgInputElementHandler);
  imgInputElement.removeEventListener('change', overlayElementHandler);
  hashtagFieldElement.removeEventListener('input', addPristineFormValidation);
  form.removeEventListener('submit', setFormSubmit);
  scaleControlSmallerElement.removeEventListener('click', getScaleDecrease);
  scaleControlBiggerElement.removeEventListener('click', getScaleIncrease);
  explodeInputFieldsValues();
  explodeUserPictureSettings();
  showImgUploader();
}

export { showImgUploader, closeUploadOverlay };


