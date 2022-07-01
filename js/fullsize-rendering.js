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
const commentsLoaderButtonElement = bigPicture.querySelector('.comments-loader');

const COMMENTS_NUMBER = 5;
// eslint-disable-next-line no-unused-vars
let socialCommentsCounterDeclension = socialCommentsCounter.childNodes[4];
let actualComments = new Array();
let commentsCountTextContent = commentsCount.textContent;
let commentsCounter = 0;

const bigPictureEscapeHandler = (evt) => {
  if( isEscapeKey(evt) ) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const removeCommentsLoader = () => {
  commentsLoaderButtonElement.classList.add('hidden');
};

const showLargeImage = () => {
  usersPicturesContainer.addEventListener('click', openBigPicture);
};

const getAllUrlsFromUserData = (data) => {
  const urls = new Array();
  data.forEach( (obj, index) => {
    obj = data[index];
    const objUrl = obj.url;
    urls.push(objUrl);
  } );
  return urls;
};

const getCurrentUrlFromUserData = (fn, currentUrl) => {
  for (let i = 0; i <= fn.length-1; i++) {
    if (currentUrl.includes( fn[i]) ) {
      return fn[i];
    }
  }
};

const removeDefaultSocialComments = () => {
  while (allSocialComments.firstChild) {
    allSocialComments.removeChild(allSocialComments.lastChild);
  }
};

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

const explodeSocialCommentCounter = () => {
  commentsCounter = 0;
};

const getCommentsNumber = (count, totalComments) => {
  const fourthNodeElement = totalComments === 1 ? socialCommentsCounterDeclension = 'комментария' : socialCommentsCounterDeclension = 'комментариев';
  socialCommentsCounter.innerHTML = `${count} из <span class="comments-count">${totalComments}</span> ${fourthNodeElement}`;
};

const getCommentStack = () => {
  const userCommentFragment = document.createDocumentFragment();
  const currentCommentStack = actualComments.splice(0, COMMENTS_NUMBER);
  commentsCounter += currentCommentStack.length;
  for (let i = 0; i <= currentCommentStack.length - 1; i++) {
    const comment = createSocialCommentsTemplate(currentCommentStack[i]);
    userCommentFragment.append(comment);
  }
  if (actualComments.length < 1) {
    removeCommentsLoader();
  }
  getCommentsNumber(commentsCounter, commentsCountTextContent);
  allSocialComments.append(userCommentFragment);
};

function openBigPicture (evt) {
  const clickedElement = evt.target;
  if (clickedElement.closest('img')) {
    bigPicture.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    bigPictureCloseButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', bigPictureEscapeHandler);
    commentsLoaderButtonElement.classList.remove('hidden');
    commentsLoaderButtonElement.addEventListener('click', getCommentStack);
    removeDefaultSocialComments();
    getFullsizedPicture(evt);
  }
}

function getFullsizedPicture (evt) {
  const selectedPost = evt.target.src;
  const selectedUrl = getCurrentUrlFromUserData(getAllUrlsFromUserData(userData), selectedPost);
  fullSizePictureImage.src = selectedUrl;
  likesCount.textContent = userData.find( (picture) => picture.url === selectedUrl).likes;
  commentsCountTextContent = userData.find( (picture) => picture.url === selectedUrl).comments.length;
  actualComments = userData.find( (picture) => picture.url === selectedUrl).comments.slice();
  photoDescription.textContent = userData.find( (picture) => picture.url === selectedUrl).description;
  getCommentStack(actualComments);
}

function closeBigPicture () {
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', bigPictureEscapeHandler);
  commentsLoaderButtonElement.removeEventListener('click', getCommentStack);
  bodyContainer.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  explodeSocialCommentCounter();
}

export {showLargeImage};

