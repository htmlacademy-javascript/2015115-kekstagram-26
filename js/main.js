const checkStringLength = (string, maxLength) => !(string.length > maxLength);
checkStringLength();

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
getRandomNumber();
