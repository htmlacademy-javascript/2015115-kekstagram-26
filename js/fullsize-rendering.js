import { usersPicturesContainer } from './thumbnail-rendering.js';
import { userData } from './thumbnail-rendering.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const fullSizePictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bodyContainer = document.querySelector('body');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('span.likes-count');
const allSocialComments = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');
const socialCommentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const bigPictureEscapeHandler = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const removeCommentsCounter= () => {
  socialCommentsCounter.classList.add('hidden');
};

const removeCommentsLoader = () => {
  commentsLoader.classList.add('hidden');
};

const showLargeImage = () => {
  usersPicturesContainer.addEventListener('click', openBigPicture);
};

function closeBigPicture () {
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', bigPictureEscapeHandler);
  bodyContainer.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

const getAllUrlsFromUserData = (data) => {
  const urls = new Array();
  data.forEach((obj, index) => {
    obj = data[index];
    const objUrl = obj.url;
    urls.push(objUrl);
  });
  return urls;
};

const getCurrentUrlFromUserData = (fn, currentUrl) => {
  for (let i = 0; i <= fn.length-1; i++) {
    if (currentUrl.includes(fn[i])) {
      return fn[i];
    }
  }
};

const removeDefaultSocialComments = () => {
  while (allSocialComments.firstChild) {
    allSocialComments.removeChild(allSocialComments.lastChild);
  }
};

function openBigPicture (evt) {
  const clickedElement = evt.target;
  if (clickedElement.closest('img')) {
    bigPicture.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    bigPictureCloseButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', bigPictureEscapeHandler);
    removeCommentsCounter();
    removeCommentsLoader();
    removeDefaultSocialComments();
    getFullsizedPicture(evt);
  }
}

const makeElementTemplate = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createSocialCommentsTemplate = (data) => {
  const socialComment = makeElementTemplate('li', 'social__comment');
  const avatarImage = makeElementTemplate('img', 'social__picture');
  avatarImage.src = data.avatar;
  avatarImage.alt = data.name;
  avatarImage.width = '35';
  avatarImage.height = '35';
  socialComment.append(avatarImage);
  const paragraphElement = makeElementTemplate('p', 'social__text');
  paragraphElement.textContent = data.message;
  socialComment.append(paragraphElement);
  return socialComment;
};

const getCommentStack = (actualComments) => {
  const userCommentFragment = document.createDocumentFragment();
  for (let i = 0; i <= actualComments.length-1; i++) {
    const comment = createSocialCommentsTemplate(actualComments[i]);
    userCommentFragment.append(comment);
  }
  allSocialComments.append(userCommentFragment);
};

function getFullsizedPicture (evt) {
  const selectedPost = evt.target.src;
  const selectedUrl = getCurrentUrlFromUserData(getAllUrlsFromUserData(userData), selectedPost);
  const actualComments = userData.find((picture) => picture.url === selectedUrl).comments;
  fullSizePictureImage.src = selectedUrl;
  likesCount.textContent = userData.find((picture) => picture.url === selectedUrl).likes;
  commentsCount.textContent = userData.find((picture) => picture.url === selectedUrl).comments.length;
  photoDescription.textContent = userData.find((picture) => picture.url === selectedUrl).description;
  getCommentStack(actualComments);
}

export {showLargeImage};
