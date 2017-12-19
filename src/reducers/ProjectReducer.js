const initialState = {
    projects: [],
    error: false,
    posting: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_PROJECT_ERROR':
            return {
                ...state,
                posting: false,
                error: action.payload.error,
                message: action.payload.message,
                fieldHints: action.payload.field_hints
            }
        case 'POST_PROJECT_STARTED':
            return {
                ...state,
                error: false,
                posting: true,
                message: '',
            }
        case 'POST_PROJECT_FULFILLED':
            return {
                ...state,
                error: false,
                posting: false,
                message: '',
                dialogOpen: false,
                projects: state.projects.concat(action.payload)
            }
        case 'ADD_PROJECT_OPEN_MODAL':
            return {
                ...state,
                modalOpen: true
            }
        case 'ADD_PROJECT_CLOSE_MODAL':
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state
    }
}