import { onFailMainLoad } from './util.js';
import { getData, getRecievedData } from './server.js';
import { showLargeImage } from './fullsize-rendering.js';
import { showImgUploader } from './uploadform-modal.js';

const getMainPage = () => {
  getData( (pictures)  => {
    getRecievedData(pictures);
  }, onFailMainLoad);
  showLargeImage();
  showImgUploader();
};

getMainPage();
