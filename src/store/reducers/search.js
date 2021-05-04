import {updateObject} from '../../shared/ultility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    data: [],
    error: false
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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SEARCH_START: return searchStart(state, action);
        case actionTypes.SEARCH_FAIL: return searchFail(state, action);
        case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
        default: return state;
    }
}

export default reducer;