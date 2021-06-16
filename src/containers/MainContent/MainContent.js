import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import classes from './MainContent.module.css'
import TrendingMovies from '../../components/TrendingMovies/TrendingMovies';
import Trailer from '../../components/Trailer/Trailer';
import Modal from '../../components/UI/Modal/Modal';
import UpcomingMovies from '../../components/UpcomingMovies/UpcomingMovies';

const MainContent = props => {
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');
    const [showingError, setShowingError] = useState(false);
    const {loadUpcomingFailed, loadTrendingFailed} = props
    useEffect(()=>{
        if(loadUpcomingFailed || loadTrendingFailed){
            setShowingError(true)
        }
    }, [loadTrendingFailed, loadUpcomingFailed])

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
        setShowingError(false)
        setShowingTrailer(false);
        setTrailerPath('');
    }

    return (
        <div>
            <div className = {classes.MainContent}>
                <div>
                    <Modal show={showingError}
                        modalType = "Error"
                        modalClosed ={hideModal}>
                            <p>{props.loadTrendingFailed ? "Error Loading Trending Movies" : null}</p>
                            <p>{props.loadUpcomingFailed ? "Error Loading Upcoming Movies" : null}</p>
                    </Modal>
                </div>
                <div>
                    <Modal show={showingTrailer}
                        modalType="Trailer"
                        modalClosed = {hideModal}>
                            <Trailer trailerPath = {trailerPath}/>
                    </Modal>
                </div>
                <div className={classes.GridItem1}>
                    <p className={classes.headline}>TRENDING NOW</p>
                    <TrendingMovies clicked = {showTrailer} />
                    <p className={classes.headline}>UPCOMING MOVIES IN THEATER</p>
                    <UpcomingMovies clicked = {showTrailer}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loadTrendingFailed: state.trendingMoviesState.error,
        loadUpcomingFailed: state.upcomingMoviesState.error
    }
}

export default connect(mapStateToProps, null)(MainContent);