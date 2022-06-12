const checkStringLength = (string, maxLength) => !(string.length > maxLength);
checkStringLength('Keks', 5);

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

const createUniqueNumbers = (neededNumber, array) => {
  while (array.length < neededNumber) {
    const randomNumber = getRandomNumber(1, neededNumber);
    if (!array.includes(randomNumber)) {
      array.push(randomNumber);
    }
  }
};

const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length-1)];

export {getRandomNumber, createUniqueNumbers, getRandomArrayElement};


