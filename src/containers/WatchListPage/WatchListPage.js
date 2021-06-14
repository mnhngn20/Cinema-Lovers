import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import classes from './WatchListPage.module.css';
import MoviesItem from '../../components/MoviesItem/MoviesItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const WatchListPage = props => {
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');

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

    let watchList = <Spinner />;
    if(props.watchList){
        watchList = props.watchList.map(movie => {
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
        <div className={classes.WatchListPage}>
            <div>
                <Modal show={showingTrailer}
                    modalType = "Trailer"
                    modalClosed = {hideModal}>
                        <Trailer trailerPath = {trailerPath}/>
                </Modal>
            </div>
            {watchList}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        watchList: state.watchListState.watchList
    }
}

export default connect(mapStateToProps, null)(WatchListPage);