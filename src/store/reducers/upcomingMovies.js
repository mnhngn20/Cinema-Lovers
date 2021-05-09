import {updateObject} from '../../shared/ultility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    upcomingMovies: [],
    error: false
}

const fetchUpcomingMoviesStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchUpcomingMoviesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const fetchUpcomingMoviesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: false,
        upcomingMovies: action.upcomingMovies
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_UPCOMING_MOVIES_START: return fetchUpcomingMoviesStart(state, action);
        case actionTypes.FETCH_UPCOMING_MOVIES_FAIL: return fetchUpcomingMoviesFail(state, action);
        case actionTypes.FETCH_UPCOMING_MOVIES_SUCCESS: return fetchUpcomingMoviesSuccess(state, action);
        default: return state;
    }
}

export default reducer;