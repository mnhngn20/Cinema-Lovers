import * as actionTypes from './actionTypes';
import movieAxios from '../../axios-movies';

export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_START
    }
}

export const searchSuccess = (data) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        data: data
    }
}

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error: error
    }
}

export const search = (typeOfSearch, query, setNumberOfPage, setTotalResults) => {
    return dispatch => {
        if (query !== ''){
            dispatch(searchStart());
            if(typeOfSearch === 'movie'){
                movieAxios.get('search/movie?api_key=ccc040ef39e5eace4f5cd8028421f9f1&query='+ query + '&page=1')
                .then(res => {
                    let fetchedSearchMovies = [];
                    let fetchedSearchMovie = null;
                    for(let key in res.data.results){
                        fetchedSearchMovie = {
                            id: res.data.results[key].id,
                            title: res.data.results[key].title? res.data.results[key].title : res.data.results[key].name,
                            overView: res.data.results[key].overview,
                            posterPath: res.data.results[key].poster_path,
                            releaseDate: res.data.results[key].release_date,
                            genresIds: res.data.results[key].genres_ids
                        }
                        fetchedSearchMovies.push(fetchedSearchMovie);
                    }
                    setTotalResults(res.data.total_results)
                    dispatch(searchSuccess(fetchedSearchMovies));
                    setNumberOfPage(res.data.total_pages)
                })
                .catch(err => {
                    dispatch(searchFail(err));
                })
            }
        }      
    }
}

export const searchMoreStart = () => {
    return {
        type: actionTypes.SEARCH_MORE_START
    }
}

export const searchMoreSuccess = (data) => {
    return {
        type: actionTypes.SEARCH_MORE_SUCCESS,
        data: data
    }
}

export const searchMoreFail = (error) => {
    return {
        type: actionTypes.SEARCH_MORE_FAIL,
        error: error
    }
}


export const searchMore = (page, typeOfSearch, query) => {
    return dispatch => {
        if (query !== ''){
            dispatch(searchMoreStart());
            if(typeOfSearch === 'movie'){
                movieAxios.get('search/movie?api_key=ccc040ef39e5eace4f5cd8028421f9f1&query='+ query + '&page=' +page)
                .then(res => {
                    let fetchedSearchMovies = [];
                    let fetchedSearchMovie = null;
                    for(let key in res.data.results){
                        fetchedSearchMovie = {
                            id: res.data.results[key].id,
                            title: res.data.results[key].title? res.data.results[key].title : res.data.results[key].name,
                            overView: res.data.results[key].overview,
                            posterPath: res.data.results[key].poster_path,
                            releaseDate: res.data.results[key].release_date,
                            genresIds: res.data.results[key].genres_ids
                        }
                        fetchedSearchMovies.push(fetchedSearchMovie);
                    }
                    dispatch(searchMoreSuccess(fetchedSearchMovies));
                })
                .catch(err => {
                    dispatch(searchMoreFail(err));
                })
            }
        }      
    }
}