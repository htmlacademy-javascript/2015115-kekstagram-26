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

const TEST_DATA_OBJECTS = 25;

const COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Анжела',
  'Дарт Вейдер',
  'Алёшенька',
  'Надежда Ивановна Петлицкая',
  'UberSlayer3000',
  'HotCocoa',
];

const DESCRIPTION = [
  'Это котик!',
  'И это котик!',
  'И это тоже котик!',
  'Здесь ничего нет кроме котиков!',
  'ААААААА',
  'Памагити',
];

const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length-1)];

// eslint-disable-next-line prefer-const
let uniqueIdNumbers = [];
// eslint-disable-next-line prefer-const
let uniqueUrls = [];
// eslint-disable-next-line prefer-const
let uniqueCommentIds = [];
// eslint-disable-next-line prefer-const
let uniqueCommentCount = [];

const createUniqueNumbers = (neededNumber, array) => {
  while (array.length < neededNumber) {
    const randomNumber = getRandomNumber(1, neededNumber);
    if (!array.includes(randomNumber)) {
      array.push(randomNumber);
    }
  }
};

createUniqueNumbers(25, uniqueIdNumbers);
createUniqueNumbers(25, uniqueUrls);
createUniqueNumbers(100, uniqueCommentIds);
createUniqueNumbers(7, uniqueCommentCount);

const createComment = () => ({
  id: uniqueCommentIds.shift(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_TEXT),
  name: getRandomArrayElement(NAMES),
});

const getCommentNumbers = (number) => {
  // eslint-disable-next-line prefer-const
  let finalCommentsArray = [];
  for (let i = 0; i < number; i++) {
    // eslint-disable-next-line prefer-const
    let comment = createComment();
    finalCommentsArray.push(comment);
  }
  return finalCommentsArray;
};

const createPictureDescription = () => ({
  id: uniqueIdNumbers.shift(),
  url: uniqueUrls.shift(),
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(15, 200),
  comments: getCommentNumbers(getRandomArrayElement(uniqueCommentCount)),
});

// eslint-disable-next-line no-unused-vars
const pictureDescription = Array.from({length: TEST_DATA_OBJECTS}, createPictureDescription);
