import {updateObject} from '../../shared/ultility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    trendingMovies: [],
    error: false
}

const fetchTrendingMoviesStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchTrendingMoviesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const fetchTrendingMoviesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: false,
        trendingMovies: action.trendingMovies
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_TRENDING_MOVIES_START: return fetchTrendingMoviesStart(state, action);
        case actionTypes.FETCH_TRENDING_MOVIES_FAIL: return fetchTrendingMoviesFail(state, action);
        case actionTypes.FETCH_TRENDING_MOVIES_SUCCESS: return fetchTrendingMoviesSuccess(state, action);
        default: return state;
    }
}

export default reducer;