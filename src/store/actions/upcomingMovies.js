import * as actionTypes from './actionTypes';
import axios from '../../axios-movies';

export const fetchUpcomingMoviesStart = () => {
    return {
        type: actionTypes.FETCH_UPCOMING_MOVIES_START
    }
}

export const fetchUpcomingMoviesSuccess = (upcomingMovies) => {
    return {
        type: actionTypes.FETCH_UPCOMING_MOVIES_SUCCESS,
        upcomingMovies: upcomingMovies
    }
}

export const fetchUpcomingMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_UPCOMING_MOVIES_FAIL,
        error: error
    }
}

export const fetchUpcomingMovies  = () => {
    return dispatch => {
        dispatch(fetchUpcomingMoviesStart());
        axios.get('movie/upcoming?api_key=ccc040ef39e5eace4f5cd8028421f9f1&language=en-US&page=2') 
        .then(res => {
            let fetchedUpcomingMovies = [];
            let fetchedUpcomingMovie = null;
            for(let key in res.data.results){
                fetchedUpcomingMovie = {
                    id: res.data.results[key].id,
                    title: res.data.results[key].title? res.data.results[key].title : res.data.results[key].name,
                    overView: res.data.results[key].overview,
                    posterPath: res.data.results[key].poster_path,
                    releaseDay: res.data.results[key].release_date,
                    genres: res.data.results[key].genre_ids,
                    popularity: res.data.results[key].popularity,
                    voteAverage: res.data.results[key].vote_average,
                    voteCount: res.data.results[key].vote_count,
                    originalLanguage: res.data.results[key].original_language,
                }
                fetchedUpcomingMovies.push(fetchedUpcomingMovie);
            }
            dispatch(fetchUpcomingMoviesSuccess(fetchedUpcomingMovies));
        })
        .catch(err => {
            dispatch(fetchUpcomingMoviesFail(err));
        })
    }
}