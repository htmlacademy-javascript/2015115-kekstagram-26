import { createPicture } from './data.js';

const usersPicturesContainer = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userData = createPicture();
const userDataFragment = document.createDocumentFragment();

const getThumbnailRenderedPictures = () => {
  userData.forEach( (picture) => {
    const userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = picture.url;
    userPicture.querySelector('.picture__likes').textContent = picture.likes;
    userPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    userDataFragment.append(userPicture);
  } );
  usersPicturesContainer.append(userDataFragment);
  return usersPicturesContainer;
};

export {usersPicturesContainer, userData};
export {getThumbnailRenderedPictures};
