import {addProject} from 'util/api_calls/ProjectApiCalls'

const modalAddProject = () => {

    return {
        type: "ADD_PROJECT_OPEN_MODAL",
        payload: {}
    }
}

const modalClose = () => {

    return {
        type: "ADD_PROJECT_CLOSE_MODAL",
        payload: {}
    }
}

const postProject = (payload, dispatch) => {

    // return {
    //     type: "POST_PROJECT_ERROR",
    //     payload: {
    //         error: true,
    //         "error_code": 400000,
    //         "type": "InputValidation",
    //         "message": "Validation error",
    //         "field_hints": {
    //                 "suburb": ["The suburb field is required."],
    //                 "state": ["The state field is required."],
    //                 "project_type_id": ["The project type id field is required."],
    //                 "location_lat": ["The location lat field is required."],
    //                 "location_long": ["The location long field is required."],
    //                 "address": ["The address field is required."],
    //                 "description": ["The description must be between 10 and 250 characters."]
    //         }
    //     }
    // }
    //
    // dispatch(modalClose());
    // return {
    //     type: "POST_PROJECT_FULFILLED",
    //     payload: {
    //         "profile_id": 2892,
    //         "name": "",
    //         "suburb": "Mascot",
    //         "state": "NSW",
    //         "location_place_id": "ChIJz-9y-iGxEmsRQMAyFmh9AQU",
    //         "location_lat": -33.9291,
    //         "location_long": 151.18793,
    //         "location_precise": true,
    //         "address": "Mascot NSW 2020, Australia",
    //         "project_type_id": "2",
    //         "min_contract_value": 75000,
    //         "max_contract_value": 100000,
    //         "ref_name": null,
    //         "ref_phone": null,
    //         "ref_business_name": null,
    //         "ref_email": null,
    //         "date": "2017-12-19T11:51:39+0000",
    //         "posts": [{
    //             "id": "0-5a38fd4e0a6336.57618209",
    //             "created_at": "2017-12-19T11:51:42+0000",
    //             "updated_at": null,
    //             "description": "This is a description that tests how long can this thing go without breaking my UI. This is a description that tests how long can this thing go without breaking my UI.",
    //             "images": ["https://workyard-passets-dev-au.s3-ap-southeast-2.amazonaws.com/1cfeb661-8e40-4b64-92d5-03bfc6490b7f/ScreenShot20171219at22603AM.png"],
    //             "default_image_url": "https://workyard-passets-dev-au.s3-ap-southeast-2.amazonaws.com/1cfeb661-8e40-4b64-92d5-03bfc6490b7f/ScreenShot20171219at22603AM.png",
    //             "created_at_unix": 1513684302,
    //             "updated_at_unix": 1513684302,
    //             "time_ago_text": ""
    //         }],
    //         "region": "Southern Sydney, Sydney",
    //         "updated_at": "2017-12-19T11:51:42+0000",
    //         "created_at": "2017-12-19T11:51:42+0000",
    //         "id": 2635,
    //         "group_id": 6594,
    //         "liked": false,
    //         "cdn_image_urls": ["https://d3aitqy18oj5cr.cloudfront.net/1cfeb661-8e40-4b64-92d5-03bfc6490b7f/ScreenShot20171219at22603AM.png"],
    //         "testimonial": null,
    //         "project_relative_url": "/p/2635",
    //         "editable": true,
    //         "deletable": true,
    //         "images_optimised": ["https://workyard-passets-dev-au.s3-ap-southeast-2.amazonaws.com/1cfeb661-8e40-4b64-92d5-03bfc6490b7f/ScreenShot20171219at22603AM.png"],
    //         "default_image_url_optimised": "https://workyard-passets-dev-au.s3-ap-southeast-2.amazonaws.com/1cfeb661-8e40-4b64-92d5-03bfc6490b7f/ScreenShot20171219at22603AM.png",
    //         "default_image_url": "https://workyard-passets-dev-au.s3-ap-southeast-2.amazonaws.com/1cfeb661-8e40-4b64-92d5-03bfc6490b7f/ScreenShot20171219at22603AM.png",
    //         "ref_verification_dt_unix": null,
    //         "date_unix": 1513684299,
    //         "created_at_unix": 1513684302,
    //         "project_type_name": "Granny Flat",
    //         "tagged": [],
    //         "tag_id_to_link": null,
    //         "taggable": true,
    //         "linkable": false,
    //         "deletable_tag": false
    //     }
    // }

    addProject(
        payload,
        result => {
            dispatch(postedProject(result, dispatch))
        },
        error => {
            dispatch(postError(error))
        }
    );

    return {
        type: "POST_PROJECT_STARTED",
        payload
    }
}

const postedProject = (payload, dispatch) => {

    dispatch(modalClose());
    return {
        type: "POST_PROJECT_FULFILLED",
        payload
    }
}

const postError = error => {

    let payload = {}
    if (error.constructor.name === 'Error') {
        // In case 500 is received I don't want to show server's raw error.
        let errorMessage = 'There was an error, please contact support.';
        payload = {
            error: true,
            message: errorMessage
        };
    } else {
        payload = {...error, error: true};
    }
    return {
        type: "POST_PROJECT_ERROR",
        payload: payload
    }
}

export { postProject, modalAddProject, modalClose }