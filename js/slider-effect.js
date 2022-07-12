import { imgUploadPreview } from './picture-scale.js';

const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderElementContainer.querySelector('.effect-level__slider');
const sliderInputValueElement = sliderElementContainer.querySelector('.effect-level__value');
const inputEffectsRadioElements = document.querySelectorAll('.effects__radio');
const defaultPictureSetting = document.querySelector('#effect-none');

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
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
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
  switch (currentEffect) {
    case PhotoEffect.CHROME:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.SEPIA:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.MARVIN:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.PHOBOS:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.HEAT:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      connectSliderWithInput(currentEffect);
      break;
    case PhotoEffect.NONE:
      imgUploadPreview.style.filter = '';
      sliderElement.style.display = 'none';
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
};

export { inputEffectsRadioElementsHandler, resetImgUploadSettings };

