import { updateObject } from '../../shared/ultility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    userId: null,
    error: false,
    token: null,
    userData: null
}

const authStart = (state, action) => {
    return updateObject(state, {
            loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        error: false,
        token: action.token,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        token: null
    })
}

const fetchUserStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userData: action.userData
    })
}

const fetchUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default: return state;
    }
}


export default reducer;
