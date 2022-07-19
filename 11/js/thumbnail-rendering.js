const usersPicturesContainer = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userDataFragment = document.createDocumentFragment();

const getThumbnailRenderedPictures = (userData) => {
  userData.forEach( ( {url, likes, comments} ) => {
    const userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    userDataFragment.append(userPicture);
  } );
  usersPicturesContainer.append(userDataFragment);
  return usersPicturesContainer;
};

export { usersPicturesContainer, getThumbnailRenderedPictures };

