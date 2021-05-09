import * as actionTypes from './actionTypes';
import axios from '../../axios-movies';

export const fetchWLStart = () => {
    return {
        type: actionTypes.FETCH_WL_START
    }
}

export const fetchWLSuccess = (watchList) => {
    return {
        type: actionTypes.FETCH_WL_SUCCESS,
        watchList: watchList
    }
}

export const fetchWLFail = (err) => {
    return {
        type: actionTypes.FETCH_WL_FAIL,
        error: err
    }
}

export const fetchWatchList = () => {
    return dispatch => {
        dispatch(fetchWLStart());
        let watchList = [];
        axios.get('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ localStorage.getItem('userId') +'/WatchList.json')
        .then(res => {
            for(let movieId in res.data){
                for(let key in res.data[movieId]){
                    const movie = res.data[movieId][key]
                    watchList.push(movie)
                }
            }
            dispatch(fetchWLSuccess(watchList));
        })
        .catch(err => {
            dispatch(fetchWLFail(err));
        })
    }
}