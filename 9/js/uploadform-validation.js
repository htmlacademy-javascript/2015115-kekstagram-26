import { isEscapeKey, validateLength, findIdenticalItem } from './util.js';
import { scalesControlButtonHandler, explodeUserPictureSettings } from './picture-scale.js';
import { scaleControlBiggerElement, scaleControlSmallerElement, getScaleIncrease, getScaleDecrease } from './picture-scale.js';
import { inputEffectsRadioElementsHandler, resetImgUploadSettings } from './slider-effect.js';

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

const explodeInputFieldsValues = () => {
  imgInputElement.value = '';
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
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

const getTempConsoleMessage = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
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

function overlayElementHandler (evt) {
  evt.preventDefault();
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonOverlayElement.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', closeButtonOverlayElementHandler);
  hashtagFieldElement.addEventListener('input', addPristineFormValidation);
  form.addEventListener('submit', getTempConsoleMessage);
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
  form.removeEventListener('submit', getTempConsoleMessage);
  scaleControlSmallerElement.removeEventListener('click', getScaleDecrease);
  scaleControlBiggerElement.removeEventListener('click', getScaleIncrease);
  explodeInputFieldsValues();
  explodeUserPictureSettings();
  showImgUploader();
}

export { showImgUploader };

