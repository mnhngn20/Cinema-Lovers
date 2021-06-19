import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-movies';
import classes from './Movie.module.css'
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';
import { checkIsInWatchList, addToWatchList, removeFromWatchList, showTrailer } from '../../shared/ultility';
import * as actions from '../../store/actions/index';
import imageError from '../../assets/imageError.jpg'
import FavoriteButton from '../../components/UI/FavoriteButton/FavoriteButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Score from '../../components/UI/Score/Score';
import MovieInfo from './MovieInfo/MovieInfo';

const imgPath = 'https://image.tmdb.org/t/p/';

const Movie = ({match, watchList, fetchWatchList, isAuthenticated, userId, isLoading}) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aorLoading, setAorLoading] = useState(false);
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');
    const [isInWatchList, setIsInWatchList] = useState(false);
    const movieId = match.params.id;

    useEffect(()=>{
        if(movie){
            setIsInWatchList(checkIsInWatchList(movie.id, watchList))
        }
    }, [watchList, movie])

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
                    genres: res.data.genres,
                    backdropPath: res.data.backdrop_path,
                    voteAverage: res.data.vote_average,
                    voteCount: res.data.vote_count,
                    tagline: res.data.tagline,
                    status: res.data.status,
                    popularity: res.data.popularity
            };
            setMovie(fetchedMovie);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [movieId]);

    const hideModal = () => {
        setShowingTrailer(false);
        setTrailerPath('');
    }

    let addOrRemoveButton = <FavoriteButton isAuthenticated={isAuthenticated} isInWatchList={isInWatchList}
                                toolTipPlacement="right" isLoading={aorLoading} 
                                clicked={isInWatchList
                                    ? () => removeFromWatchList(userId, movie.id, setAorLoading, fetchWatchList)
                                    : () => addToWatchList(userId, {...movie, genres: movie.genres.map((genre) => genre.id)}, setAorLoading, fetchWatchList)}
                                    type= "MovieType"/>
    
    return (
        <div className={classes.Movie}>
            <Modal show = {showingTrailer}
                modalType = "Trailer"
                modalClosed = {hideModal}>
                <Trailer trailerPath = {trailerPath} />
            </Modal>
            {
                loading || !movie
                ? <div className={classes.Spinner}><Spinner /></div>
                : <div className={classes.MovieContainer}>
                    <div className={classes.BackGround}>
                    </div>
                    <div className={classes.BackdropContainer}>
                        <MovieInfo movie={movie} addOrRemoveButton={addOrRemoveButton} showTrailer={(movieId) => showTrailer(movieId, setShowingTrailer, setTrailerPath)}/>
                        <img className={classes.Backdrop} src={movie.backdropPath ? imgPath + 'original' + movie.backdropPath : imageError} alt="img"/> 
                        <div className={classes.TopInfo}>
                            <div className={classes.Rate}>
                                <Score voteCount={movie.voteCount} voteAverage={movie.voteAverage} />
                            </div>
                            {addOrRemoveButton}
                        </div>
                    </div>
                </div>
            } 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.authState.userId,
        watchList: state.watchListState.watchList,
        isAuthenticated: state.authState.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWatchList: (userId)=> dispatch(actions.fetchWatchList(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);