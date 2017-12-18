import {addProject} from 'util/api_calls/ProjectApiCalls'


const postProject = payload => {
    // console.log(payload);

    addProject(payload, {}, result => console.log(result) );

    return {
        type: "POST_PROJECT",
        payload
    }
}

export {
    postProject
}