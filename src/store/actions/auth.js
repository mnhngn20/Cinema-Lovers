import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fetchWatchList } from './watchlist';
import { database } from '../../instance/Firebase'

const apiKey = process.env.REACT_APP_API_KEY;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, refreshToken, isSignUp) => {
    if(!isSignUp){
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('refreshToken', refreshToken)
    }   
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: isSignUp ? null : token, 
        userId: isSignUp ? null : userId,
        isAuth: isSignUp ? false : true
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
    localStorage.removeItem('refreshToken');
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
                dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.refreshToken));
                dispatch(fetchUserProfile(res.data.localId));
                dispatch(fetchWatchList(res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn))
            }
            if(userData){
                database.ref("UserData/"+ res.data.localId + "/Info").set(userData);
                dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.refreshToken, isSignUp));
            }
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const autoSignIn = () => {
    return dispatch => {
        if(localStorage.getItem('refreshToken')){
            const reqPayload = {
                "grant_type": "refresh_token",
                "refresh_token": localStorage.getItem('refreshToken')
            }
            axios.post('https://securetoken.googleapis.com/v1/token?key=' + apiKey, reqPayload).then(res => {
                dispatch(authSuccess(res.data.id_token, res.data.user_id, res.data.refresh_token));
                dispatch(fetchUserProfile(res.data.user_id));
                dispatch(fetchWatchList(res.data.user_id));
                dispatch(checkAuthTimeout(res.data.expires_in))
            }).catch(err => {
                dispatch(authFail(err))
            })
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
            dispatch(fetchUserFail(err))
        })
    }
}

export const updateUserProfile = (userData) => {
    return dispatch => {
        dispatch(fetchUserStart());
        database.ref("UserData/"+localStorage.getItem("userId") + "/Info").set(userData).then(snapshot => {
            dispatch(fetchUserSuccess(userData));
        });
    }
}

export const changePassword = (newPassword) => {
    return dispatch => {
        dispatch(authStart());
        const payload = {
            idToken: localStorage.getItem('token'),
            password: newPassword,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key='+ apiKey, payload).then((res)=>{
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('refreshToken', res.data.refreshToken)
        }).catch(err => dispatch(authFail(err)))
    }
}