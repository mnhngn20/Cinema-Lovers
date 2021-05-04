import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import classes from './TrendingPage.module.css';
import MoviesItem from '../../components/MoviesItem/MoviesItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const TrendingPage = props => {
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');

    const {onFetchTrendingMovies} = props;
    useEffect(()=>{
        onFetchTrendingMovies();
    }, [onFetchTrendingMovies])

    const showTrailer = (movieId) => {
        setShowingTrailer(true);
        axios.get('https://api.themoviedb.org/3/movie/'
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


    let trendingMoviesList = <Spinner />;
    if(!props.isloading){
        trendingMoviesList = props.fetchedTrendingMovies.map((movie) => {
            return (
                    <MoviesItem
                        clicked = {showTrailer}
                        movie = {movie}
                        poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                        key={movie.id} 
                        title = {movie.title}></MoviesItem>
            )
        })
    }

    return (
        <div className = {classes.TrendingPage}>
            <Modal 
                show={showingTrailer}
                modalClosed = {hideModal}>
                    <Trailer trailerPath = {trailerPath}/>
            </Modal>
            {trendingMoviesList}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isloading: state.trendingMoviesState.loading,
        fetchedTrendingMovies: state.trendingMoviesState.trendingMovies,
        isError: state.trendingMoviesState.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTrendingMovies: () => dispatch(actions.fetchTrendingMovies()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);