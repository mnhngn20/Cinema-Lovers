import React, { useState } from 'react';
import axios from 'axios';

import classes from './MainContent.module.css'
import TrendingMovies from '../../components/TrendingMovies/TrendingMovies';
import YourWatchList from '../../components/YourWatchlist.js/YourWatchList';
import Trailer from '../../components/Trailer/Trailer';
import Modal from '../../components/UI/Modal/Modal';

const MainContent = props => {
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');
    
    const showTrailer = movieId => {
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

    return (
        <div>
            <div className = {classes.MainContent}>
                <div>
                    <Modal show={showingTrailer}
                        modalClosed = {hideModal}>
                            <Trailer trailerPath = {trailerPath}/>
                    </Modal>
                </div>
                <div className={classes.GridItem1}>
                    <TrendingMovies clicked = {showTrailer} />
                </div>
            </div>
        </div>
    )
}

export default MainContent;