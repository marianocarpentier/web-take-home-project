import {addProject} from 'util/api_calls/ProjectApiCalls'


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
    addProject(
        payload,
        result => {
            dispatch(postedProject(result))
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

const postedProject = payload => {

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

export {
    postProject
}