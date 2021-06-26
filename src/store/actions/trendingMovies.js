import * as actionTypes from './actionTypes';
import axios from '../../axios-movies';

export const fetchTrendingMoviesStart = () => {
    return {
        type: actionTypes.FETCH_TRENDING_MOVIES_START
    }
}

export const fetchTrendingMoviesSuccess = (trendingMovies) => {
    return {
        type: actionTypes.FETCH_TRENDING_MOVIES_SUCCESS,
        trendingMovies: trendingMovies
    }
}

export const fetchTrendingMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_TRENDING_MOVIES_FAIL,
        error: error
    }
}

export const fetchTrendingMovies  = (page, setNumberOfPage, setTotalResults) => {
    return dispatch => {
        dispatch(fetchTrendingMoviesStart());
        axios.get('trending/all/day?api_key=ccc040ef39e5eace4f5cd8028421f9f1&page=' + page) 
        .then(res => {
            let fetchedTrendingMovies = [];
            let fetchedTrendingMovie = null;
            for(let key in res.data.results){
                fetchedTrendingMovie = {
                    id: res.data.results[key].id,
                    title: res.data.results[key].title ? res.data.results[key].title : res.data.results[key].name,
                    overView: res.data.results[key].overview,
                    posterPath: res.data.results[key].poster_path,
                    releaseDay: res.data.results[key].release_date ? res.data.results[key].release_date : res.data.results[key].first_air_date,
                    genres: res.data.results[key].genre_ids,
                    voteAverage: res.data.results[key].vote_average,
                    voteCount: res.data.results[key].vote_count,
                    mediaType: res.data.results[key].media_type,
                    originalLanguage: res.data.results[key].original_language,
                    popularity: res.data.results[key].popularity
                }
                fetchedTrendingMovies.push(fetchedTrendingMovie);
            }
            setNumberOfPage(res.data.total_pages);
            setTotalResults(res.data.total_results);
            dispatch(fetchTrendingMoviesSuccess(fetchedTrendingMovies));
        })
        .catch(err => {
            dispatch(fetchTrendingMoviesFail(err));
        })
    }
}