import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fetchWatchList } from './watchlist';
import { database } from '../../instance/Firebase'
const apiKey = 'AIzaSyAjXOiBjFoQ8KFlFolctnns5BeHKIua4Mw';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, isSignUp) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: isSignUp ? null : token, 
        userId: isSignUp ? null : userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate'); 
    localStorage.removeItem('userId'); 
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (username, password, isSignUp, userData) => {
    return dispatch => {
        dispatch(authStart());
        const resData = {
            email: username,
            password: password,
            returnSecureToken: true,
        }    
        let resQuery = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
        if(isSignUp){
            resQuery = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
        }
        axios.post(resQuery, resData)
        .then(res => {
            if(!isSignUp){
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                dispatch(fetchUserProfile(res.data.localId));
                dispatch(fetchWatchList(res.data.localId));
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            }
            if(userData){
                database.ref("UserData/"+ res.data.localId + "/Info").set(userData);
                dispatch(authSuccess(res.data.idToken, res.data.localId, isSignUp));
            }
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const autoSignIn = () => {
    return dispatch => {
        if(localStorage.getItem('token')){
            dispatch(authSuccess(localStorage.getItem('token'), localStorage.getItem('userId')));
            dispatch(fetchUserProfile());
            dispatch(fetchWatchList(localStorage.getItem('userId')));
        }
    }
}

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
}

export const fetchUserSuccess = (userData) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        userData: userData
    }
}

export const fetchUserFail = (err) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: err
    }
}

export const fetchUserProfile = () => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/' + localStorage.getItem('userId') + '/Info.json' )
        .then(res => {
            let userData = null
            userData = res.data
            dispatch(fetchUserSuccess(userData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const updateUserProfile = (userData) => {
    return dispatch => {
        dispatch(fetchUserStart());
        database.ref("UserData/"+localStorage.getItem("userId") + "/Info").set(userData);
        dispatch(fetchUserSuccess(userData));
    }
}