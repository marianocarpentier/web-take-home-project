import RestApiClient from './RestApiClient';

//------------------------------------------------------------------------------
//-------------------------- Add a Project API Call-----------------------------
//------------------------------------------------------------------------------

const addProject = (newProjectPayload, successCallback, catchCallback) => {
    RestApiClient({
        relativeUrl: '/v1/me/project',
        type: 'POST',
        payload: newProjectPayload,
        successCallback,
        catchCallback
    });
}

export {addProject}