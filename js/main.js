import { onFailMainLoad } from './util.js';
import { getData, getRawDataFromServer } from './server.js';
import { getThumbnailRenderedPictures } from './thumbnail-rendering.js';
import { showLargeImage } from './fullsize-rendering.js';
import { showImgUploader } from './uploadform-validation.js';
//import { setFormSubmit } from './uploadform-validation.js';

getData( (pictures)  => {
  getThumbnailRenderedPictures( getRawDataFromServer(pictures) );
}, onFailMainLoad);

showLargeImage();
showImgUploader();

//setFormSubmit();

