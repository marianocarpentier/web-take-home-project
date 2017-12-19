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
        default:
            return state
    }
}