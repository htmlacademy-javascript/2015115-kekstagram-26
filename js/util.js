const ALERT_SHOW_TIME = 3000;

const onFailMainLoad = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '31%';
  alertContainer.style.top = '40%';
  alertContainer.style.marginLeft = '-100 px';
  alertContainer.style.marginTop = '-75px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';
  alertContainer.style.borderRadius = '40px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const validateLength = (data, number) => data.length <= number;

const isEscapeKey = (evt) => evt.key === 'Escape';

const findIdenticalItem = (array) => {
  const tempArray = [...new Set(array)];
  return JSON.stringify(array) === JSON.stringify(tempArray);
};

const getToFixedNumber = (number) => (number * 0.01).toFixed(2);

const getCommentDeclension = (totalComments, data) => {
  totalComments = Math.abs(totalComments) % 100;
  const number = totalComments % 100;
  return number === 1 ? data[0] : data[1];
};

const getRandomNumber = (startValue, endValue) => {
  if (startValue < 0 || endValue < 0) {
    return;
  }
  const firstNumber = Math.ceil(startValue);
  const secondNumber = Math.floor(endValue);
  if (firstNumber < secondNumber) {
    return Math.floor( Math.random() * (secondNumber - firstNumber + 1) ) + firstNumber;
  }
  switch(firstNumber) {
    case secondNumber:
      return firstNumber;
    default: return Math.floor( Math.random() * (firstNumber - secondNumber + 1) ) + secondNumber;
  }
};

const shuffle = (arr) => {
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--) {
    j = Math.floor( Math.random() * (i + 1) );
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const debounce = (cb, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout( () => cb.apply(this, rest), timeoutDelay);
  };
};


const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length-1)];

export { getRandomNumber, getRandomArrayElement, onFailMainLoad, shuffle, debounce };
export { isEscapeKey, validateLength, findIdenticalItem, getCommentDeclension, getToFixedNumber };


