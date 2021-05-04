import React, { useState, useEffect } from 'react';
import axiosTrailer from 'axios';
import { connect } from 'react-redux';

import axios from '../../axios-movies';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';
import { checkIsInWatchList } from '../../shared/ultility';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 500

const Movie = props => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');

    const addToWatchList = (userId, movie) => {
        axios.post('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ userId +'/WatchList/'+ movie.id +'.json', movie)
        .then(res => { 
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const removeFromWatchList = (userId, movieId) => {
        axios.delete('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ userId +'/WatchList/'+ movieId +'.json')
        .then(res => { 
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const movieId = props.match.params.id;
    useEffect(()=> {
        setLoading(true);
        axios.get('/movie/' + movieId +'?api_key=ccc040ef39e5eace4f5cd8028421f9f1&language=en-US')
        .then(res => {
            const fetchedMovie = {
                    id: res.data.id,
                    title: res.data.title? res.data.title : res.data.name,
                    overView: res.data.overview,
                    posterPath: res.data.poster_path,
                    releaseDay: res.data.release_date,
                    genres: res.data.genres
            };
            setMovie(fetchedMovie);
            setLoading(false);
        }).
        catch(err => {
            console.log(err);
        })
    }, [movieId]);

    const showTrailer = movieId => {
        setShowingTrailer(true);
        axiosTrailer.get('https://api.themoviedb.org/3/movie/'
        + movieId +
        '/videos?api_key=ccc040ef39e5eace4f5cd8028421f9f1&language=en-US')
        .then(res => {
            setTrailerPath(res.data.results[0].key)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const hideModal = () => {
        setShowingTrailer(false);
        setTrailerPath('');
    }

    let renderedMovie = <Spinner />
    if(!loading && movie){
        renderedMovie = (
            <div>
                <img src={imgPath + 'w' + imgWidth + movie.posterPath} /> 
                <p>{movie.title}</p>
                <p>{movie.releaseDay}</p>
                <p>{movie.overView}</p>
                <button onClick = {() => showTrailer(movieId)} >PLAY</button>
                <button onClick = {checkIsInWatchList(movieId, props.watchList) 
                    ? () => removeFromWatchList(props.userId, movie)
                    : () => addToWatchList(props.userId, movie)}>
                    {checkIsInWatchList(movieId, props.watchList)?'REMOVE FROM WATCHLIST': 'ADD TO WATCHLIST'}
                </button>
            </div>        
        )
    }    
    return (
        <div>
            <Modal show = {showingTrailer}
                modalClosed = {hideModal}>
                <Trailer trailerPath = {trailerPath} />
            </Modal>
            {renderedMovie}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.authState.userId,
        watchList: state.watchListState.watchList
    }
}

export default connect(mapStateToProps, null)(Movie);