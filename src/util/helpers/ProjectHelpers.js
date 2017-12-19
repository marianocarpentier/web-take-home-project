//-----------------------------------------------------------------------------------------
//----------------------------- Third Party Library imports -------------------------------
//-----------------------------------------------------------------------------------------

import uploadcare from 'uploadcare-widget';


//-----------------------------------------------------------------------------------------
//---------------------------------- Internal imports -------------------------------------
//-----------------------------------------------------------------------------------------

import {DEFAULT_UPLOADCARE_SETTINGS} from '../Constants';


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


const projectPayloadCreator = (addressCode, pictures, contract, latLng, description, selectedProjectId) => {

    let suburb = '';
    let state = '';
    let placeId = '';
    let address = '';
    if (addressCode) {

        if (addressCode.address_components) {

            suburb = addressCode.address_components.find(comp => comp.types.includes('locality'));
            state = addressCode.address_components.find(comp => comp.types.includes('administrative_area_level_1'));
        }

        if (addressCode.place_id) {
            placeId = addressCode.place_id;
        }

        if (addressCode.formatted_address) {
            address = addressCode.formatted_address;
        }
    }

    let imageUrls = pictures.map(pic => pic.url);
    let files = imageUrls.map(url => url.replace('https://ucarecdn.com', '').replace(/\//g, ''));

    let {min, max} = contract;

    return {
        "suburb": suburb ? suburb.long_name : '',
        "state": state ? state.short_name : '',
        "location_place_id": placeId,
        "location_lat": latLng.lat,
        "location_long": latLng.lng,
        "address": address,
        "date_unix": Math.round((new Date()).getTime() / 1000),
        "description": description,
        "images": imageUrls,
        "files": files,
        "default_image_url": imageUrls[0],
        "project_type_id": selectedProjectId,
        "min_contract_value": min,
        "max_contract_value": max
    };
}


export {
    openUploadCareDialog, projectPayloadCreator
}

