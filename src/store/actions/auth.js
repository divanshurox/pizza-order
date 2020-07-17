import * as action from './actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type: action.AUTH_START
    }
}

export const authFail = (err) => {
    return {
        type: action.AUTH_FAIL,
        error: err
    }
}

export const authSuccess = (authDetails) => {
    return {
        type: action.AUTH_SUCCESS,
        idToken: authDetails.idToken,
        userId: authDetails.localId
    }
}

export const authGoogleSuccess = (authDetails) => {
    console.log(authDetails);
    return {
        type: action.AUTH_GOOGLE_SUCCESS,
        idToken: authDetails.tokenId,
        userId: authDetails.googleId
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: action.LOGOUT
    }
}

export const checkAuthTimeout = (exTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, exTime * 1000);
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const exDate = new Date(localStorage.getItem('expirationDate'));
            if (exDate < new Date()) {
                dispatch(logOut());
            }
            dispatch(authSuccess({ idToken: localStorage.getItem('token'), localId: localStorage.getItem('userId') }));
            dispatch(checkAuthTimeout((exDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}

export const authorise = (resp, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: resp.Rt.Bu,
            password: resp.Rt.WU.substring(0, 9),
            returnSecureToken: true
        }
        console.log(authData);
        const url = isSignUp === 'UP' ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuem70xZ-f1mUn-1VcRy0BW7qORBi_-E8' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuem70xZ-f1mUn-1VcRy0BW7qORBi_-E8';
        axios.post(url, authData)
            .then((res) => {
                console.log(res.data);
                const exDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', exDate);
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log(authData);
        const url = isSignUp === 'UP' ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuem70xZ-f1mUn-1VcRy0BW7qORBi_-E8' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuem70xZ-f1mUn-1VcRy0BW7qORBi_-E8';
        axios.post(url, authData)
            .then((res) => {
                console.log(res.data);
                const exDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', exDate);
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    }
}

export const changeAuthPath = (path) => {
    return {
        type: action.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};