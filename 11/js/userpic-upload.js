const imgInputElement = document.querySelector('#upload-file');
const userPictureUploadElement = document.querySelector('.img-upload__preview').querySelector('img');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgInputElementHandler = () => {
  const userFile = imgInputElement.files[0];
  const fileName = userFile.name.toLowerCase();

  const matches = FILE_TYPES.some( (element) => fileName.endsWith(element) );
  if (matches) {
    userPictureUploadElement.src = URL.createObjectURL(userFile);
    userPictureUploadElement.style.pointerEvents = 'none';
  }
};

export { imgInputElementHandler, imgInputElement };

