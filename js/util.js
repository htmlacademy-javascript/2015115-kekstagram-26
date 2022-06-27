const validateLength = (data, number) => data.length <= number;

const isEscapeKey = (evt) => evt.key === 'Escape';

const findIdenticalItem = (array) => {
  const tempArray = [...new Set(array)];
  return JSON.stringify(array) === JSON.stringify(tempArray);
};

const getRandomNumber = (startValue, endValue) => {
  if (startValue < 0 || endValue < 0) {
    return;
  }
  const firstNumber = Math.ceil(startValue);
  const secondNumber = Math.floor(endValue);
  if (firstNumber < secondNumber) {
    return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
  }
  switch(firstNumber) {
    case secondNumber:
      return firstNumber;
    default: return Math.floor(Math.random() * (firstNumber - secondNumber + 1)) + secondNumber;
  }
};

const createUniqueNumbers = (neededNumber) => {
  const container = new Array();
  while (container.length < neededNumber) {
    const randomNumber = getRandomNumber(1, neededNumber);
    if (!container.includes(randomNumber)) {
      container.push(randomNumber);
    }
  }
  return container;
};

const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length-1)];

export {getRandomNumber, createUniqueNumbers, getRandomArrayElement};
export {isEscapeKey, validateLength, findIdenticalItem};


