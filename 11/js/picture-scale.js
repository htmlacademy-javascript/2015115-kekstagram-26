import { getToFixedNumber } from './util.js';

const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlSmallerElement = imgUploadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadScaleElement.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScaleElement.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

const COUNTER_STEP = 25;
const MAXIMUM_SCALE_VALUE = 100;
let defaultControlScaleNumber = 100;

const explodeUserPictureSettings = () => {
  defaultControlScaleNumber = 100;
  imgUploadPreview.style = 'transform: scale(1.00)';
};

const scalesControlButtonHandler = (element, cb) => {
  scaleControlValue.value = `${ defaultControlScaleNumber }%`;
  element.addEventListener('click', cb);
};

const changeDefaultControlScaleValue = (defaultNumber) => {
  scaleControlValue.value = `${ defaultNumber }%`;
  imgUploadPreview.style = `transform: scale( ${ getToFixedNumber(defaultNumber) } )`;
  scaleControlValue.readonly = scaleControlValue.value;
};

const getScaleIncrease = () => {
  if (defaultControlScaleNumber !== MAXIMUM_SCALE_VALUE) {
    defaultControlScaleNumber += COUNTER_STEP;
    changeDefaultControlScaleValue(defaultControlScaleNumber);
  }
};

const getScaleDecrease = () => {
  if (defaultControlScaleNumber !== COUNTER_STEP) {
    defaultControlScaleNumber -= COUNTER_STEP;
    changeDefaultControlScaleValue(defaultControlScaleNumber);
  }
};

export { scalesControlButtonHandler, explodeUserPictureSettings, imgUploadPreview };
export { scaleControlBiggerElement, getScaleIncrease, scaleControlSmallerElement, getScaleDecrease };
