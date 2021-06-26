import {updateObject} from '../../shared/ultility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    data: [],
    error: false,
    moreLoading: false
}

const searchStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const searchFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const searchSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: false,
        data: action.data
    })
}

const searchMoreStart = (state, action) => {
    return updateObject(state, {
        moreLoading: true
    });
}

const searchMoreFail = (state, action) => {
    return updateObject(state, {
        moreLoading: false,
        error: action.error
    });
}

const searchMoreSuccess = (state, action) => {
    return updateObject(state, {
        moreLoading: false,
        error: false,
        data: state.data.concat(action.data)
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SEARCH_START: return searchStart(state, action);
        case actionTypes.SEARCH_FAIL: return searchFail(state, action);
        case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
        case actionTypes.SEARCH_MORE_START: return searchMoreStart(state, action);
        case actionTypes.SEARCH_MORE_FAIL: return searchMoreFail(state, action);
        case actionTypes.SEARCH_MORE_SUCCESS: return searchMoreSuccess(state, action);
        default: return state;
    }
}

export default reducer;