import * as actionTypes from './actionTypes';
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
        console.log("fetchWL")
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

export const updateWatchList = watchList => {
    return dispatch => {
        dispatch(fetchWLStart());
        dispatch(fetchWLSuccess(watchList))
    }
}
