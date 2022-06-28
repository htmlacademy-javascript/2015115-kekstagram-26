import { getThumbnailRenderedPictures } from './thumbnail-rendering.js';
import { showLargeImage } from './fullsize-rendering.js';
import { createPicture } from './data.js';
import { showImgUploader } from './uploadform-validation.js';

createPicture();
getThumbnailRenderedPictures();
showLargeImage();
showImgUploader();
