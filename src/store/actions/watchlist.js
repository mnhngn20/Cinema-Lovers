import * as actionTypes from './actionTypes';
import axios from '../../axios-movies';
import { database } from '../../instance/Firebase'

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
        database.ref("UserData/"+localStorage.getItem("userId") + "/WatchList/").get().then(snapshot => {
            for(let movieId in snapshot.val()){
                const movie = snapshot.val()[movieId]
                watchList.push(movie)
            }
            dispatch(fetchWLSuccess(watchList));
        })
    }
}

