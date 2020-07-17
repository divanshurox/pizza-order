import * as actions from '../actions/actions';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    authPath: '/'
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actions.AUTH_FAIL:
            return {
                ...state,
                loading: false
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                loading: false,
                isAuthenticated: true
            }
        case actions.AUTH_GOOGLE_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                loading: false,
                isAuthenticated: true
            }
        case actions.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userId: null
            }
        case actions.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authPath: action.path
            }
        default:
            return state;
    }
};

export default reducer;