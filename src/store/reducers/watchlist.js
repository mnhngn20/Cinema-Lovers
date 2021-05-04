import { updateObject } from '../../shared/ultility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: false,
    watchList: []
}

const fetchWLStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchWLSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        watchList: action.watchList
    })
}

const fetchWLFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_WL_START: return fetchWLStart(state, action);
        case actionTypes.FETCH_WL_SUCCESS: return fetchWLSuccess(state, action);
        case actionTypes.FETCH_WL_FAIL: return fetchWLFail(state, action);
        default: return state;
    }
}

export default reducer;