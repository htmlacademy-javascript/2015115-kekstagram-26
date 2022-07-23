import { imgUploadPreview } from './picture-scale.js';

const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderElementContainer.querySelector('.effect-level__slider');
const sliderInputValueElement = sliderElementContainer.querySelector('.effect-level__value');
const inputEffectsRadioElements = document.querySelectorAll('.effects__radio');
const defaultPictureSetting = document.querySelector('#effect-none');

const DEFAULT_MIN_RANGE_VALUE = 0;
const DEFAULT_MAX_RANGE_VALUE = 1;
const DEFAULT_START_VALUE = 1;
const DEFAULT_STEP_VALUE = 0.1;
const MARVIN_MAX_RANGE_VALUE = 100;
const MARVIN_STEP_VALUE = 1;
const MARVIN_START_VALUE = 100;
const PHOBOS_MAX_RANGE_VALUE = 3;
const PHOBOS_START_VALUE = 3;
const HEAT_MIN_RANGE_VALUE = 1;
const HEAT_MAX_RANGE_VALUE = 3;
const HEAT_START_VALUE = 3;

sliderInputValueElement.value = 1;

const PhotoEffect = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  NONE: 'none',
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_MIN_RANGE_VALUE,
    max: DEFAULT_MAX_RANGE_VALUE,
  },
  start: DEFAULT_START_VALUE,
  step: DEFAULT_STEP_VALUE,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setSliderOptions = (min, max, step, start) =>
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
  });

const addFilterStyle = (filterName, value) => {
  let styleFilter;
  switch (filterName) {
    case PhotoEffect.CHROME:
      styleFilter = `grayscale(${ value })`;
      break;
    case PhotoEffect.SEPIA:
      styleFilter = `sepia(${ value })`;
      break;
    case PhotoEffect.MARVIN:
      styleFilter = `invert(${ value }%)`;
      break;
    case PhotoEffect.PHOBOS:
      styleFilter = `blur(${ value }px)`;
      break;
    case PhotoEffect.HEAT:
      styleFilter = `brightness(${ value })`;
      break;
    default:
      styleFilter = '';
      break;
  }
  imgUploadPreview.style.filter = styleFilter;
};

const connectSliderWithInput = (currentEffect) => {
  sliderElement.noUiSlider.on('update', () => {
    sliderInputValueElement.value = sliderElement.noUiSlider.get();
    addFilterStyle(currentEffect, sliderInputValueElement.value);
  });
};

const updateSliderOptions = (currentEffect) => {
  sliderElement.style.display = 'block';
  sliderElementContainer.classList.remove('hidden');
  switch (currentEffect) {
    case PhotoEffect.CHROME:
      setSliderOptions(DEFAULT_MIN_RANGE_VALUE, DEFAULT_MAX_RANGE_VALUE, DEFAULT_STEP_VALUE, DEFAULT_START_VALUE);
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.SEPIA:
      setSliderOptions(DEFAULT_MIN_RANGE_VALUE, DEFAULT_MAX_RANGE_VALUE, DEFAULT_STEP_VALUE, DEFAULT_START_VALUE);
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.MARVIN:
      setSliderOptions(DEFAULT_MIN_RANGE_VALUE, MARVIN_MAX_RANGE_VALUE, MARVIN_STEP_VALUE, MARVIN_START_VALUE);
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.PHOBOS:
      setSliderOptions(DEFAULT_MIN_RANGE_VALUE, PHOBOS_MAX_RANGE_VALUE, DEFAULT_STEP_VALUE, PHOBOS_START_VALUE);
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.HEAT:
      setSliderOptions(HEAT_MIN_RANGE_VALUE, HEAT_MAX_RANGE_VALUE, DEFAULT_STEP_VALUE, HEAT_START_VALUE);
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.NONE:
      imgUploadPreview.style.filter = '';
      sliderElement.style.display = 'none';
      sliderElementContainer.classList.add('hidden');
      break;
  }
};

const inputEffectsRadioElementsHandler = () => {
  inputEffectsRadioElements.forEach( (radio) => {
    radio.addEventListener('change', () => {
      const newValue = radio.value;
      const previousValue = imgUploadPreview.classList[0];
      imgUploadPreview.classList.remove( `${ previousValue }` );
      imgUploadPreview.classList.add( `effects__preview--${ newValue }` );
      updateSliderOptions(newValue);
    });
  } );
};

const resetImgUploadSettings = () => {
  defaultPictureSetting.checked = true;
  const classNames = imgUploadPreview.classList[0];
  imgUploadPreview.classList.remove(`${ classNames }`);
  sliderElement.style.display = 'none';
  sliderElementContainer.classList.add('hidden');
};

export { inputEffectsRadioElementsHandler, resetImgUploadSettings };
export { sliderInputValueElement, sliderElement, inputEffectsRadioElements };
