//-----------------------------------------------------------------------------------------
//----------------------------- Third Party Library imports -------------------------------
//-----------------------------------------------------------------------------------------

import uploadcare from 'uploadcare-widget';


//-----------------------------------------------------------------------------------------
//---------------------------------- Internal imports -------------------------------------
//-----------------------------------------------------------------------------------------

import { DEFAULT_UPLOADCARE_SETTINGS } from '../Constants';


//-----------------------------------------------------------------------------------------
//------------- Open uploadcare dialog/modal and pass uploaded files to handler -----------
//-----------------------------------------------------------------------------------------

/*

  Inputs: a callback function (called handleUploadedImages)
  The callback, handleUploadedImages, receives a single argument which is an array of object e.g.

  [
    { name: "nameA", url: "urlA" },
    { name: "nameB", url: "urlB" },
    { name: "nameC", url: "urlC" }
  ]

*/



const openUploadCareDialog = handleUploadedImages => {

  // Open the uploadcare dialog
  uploadcare.openDialog(null, DEFAULT_UPLOADCARE_SETTINGS)
  // Fail handler
  .fail(failedUpload => {
    console.log("upload failed: ".failedUpload);
  })
  // Once modal is closed and files have been converted to url's, fire done handler
  .done(info => {
    const files = info.files();
    const filesLength = files.length;
    const filesArray = [];
    files.forEach(file => {
        file.done(fileInfo => {
            filesArray.push({
                name: fileInfo.name,
                url: fileInfo.originalUrl
            });
            if (filesArray.length === filesLength) {
              // Pass uploaded files to handler
              handleUploadedImages(filesArray);
            }
        });
    });
  });
}


export {
  openUploadCareDialog
}

