import React, { useState, useEffect } from 'react';
import axiosTrailer from 'axios';
import { connect } from 'react-redux';

import axios from '../../axios-movies';
import classes from './Movie.module.css'
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';
import { checkIsInWatchList, getGenre } from '../../shared/ultility';
import * as actions from '../../store/actions/index';
import imageError from '../../assets/imageError.jpg'
import imageErrorPoster from '../../assets/imageErrorPoster.jpg';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import Spinner from '../../components/UI/Spinner/Spinner'
import Button from '../../components/UI/Button/Button'
const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 500;

const Movie = props => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aorLoading, setAorLoading] = useState(false);
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');
    const [isInWatchList, setIsInWatchList] = useState(false);
    const { watchList, fetchWatchList } = props;
    const movieId = props.match.params.id;

    useEffect(()=>{
        if(movie){
            console.log(imgPath + 'w' + imgWidth + movie.posterPath);
            setIsInWatchList(checkIsInWatchList(movie.id, watchList))
        }
    }, [watchList, movie])

    const addToWatchList = (userId, movie) => {
        setAorLoading(true);
        const postMovie = {
            ...movie,
            genres: movie.genres.map((genre) => {
                return genre.id
            })
        }
        axios.post('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ userId +'/WatchList/'+ movie.id +'.json', postMovie)
        .then(res => { 
            fetchWatchList();
            setAorLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const removeFromWatchList = (userId, movieId) => {
        setAorLoading(true)
        axios.delete('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ userId +'/WatchList/'+ movie.id +'.json')
        .then(res => { 
            fetchWatchList();
            setAorLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

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

    const btnType = isInWatchList ? "RemoveBtn" : "AddBtn";
    let addOrRemoveButton = (
        props.isAuthenticated 
            ?
            aorLoading 
                ? <CircularProgress className={classes.Spinner}/>
                : <Tooltip title={isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"} placement="right">
                    <FavoriteIcon 
                        style={{width: '80px', height: '80px'}}
                        className = {[classes.FavoriteButton, classes[btnType]].join(' ')}
                        onClick = {isInWatchList
                            ? () => removeFromWatchList(props.userId, movie)
                            : () => addToWatchList(props.userId, movie)} />
                </Tooltip>
            : null
    )

    let poster = null;
    let genres = null;
    if(!loading && movie){
        genres = movie.genres.map(genre => {
            return (
                <Chip key={genre.id} className={classes.Chip} label={getGenre(genre.id)} />
            )
        })
        poster = <img className={classes.Poster} src={movie.posterPath ? imgPath + 'w' + imgWidth + movie.posterPath : imageErrorPoster} />
    }
    
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
                        <div className={classes.MovieInfo}>
                            <div className={classes.TitleContainer}>
                                <p className={classes.Title}>{movie.title}</p>
                            </div>
                            <div className={classes.Info}>
                                <div className={classes.Info1}>
                                    <p className = {[classes.Info1Text, classes.MobileOnly].join(' ')}>Score: {movie.voteAverage}/10</p>
                                    <p className = {[classes.Info1Text, classes.MobileOnly].join(' ')}>{movie.voteCount} Ratings</p>
                                    <p className={classes.Info1Text}>Release Date: {movie.releaseDay}</p>
                                    <p className={classes.Info1Text}>Status: {movie.status}</p>
                                    <p className = {classes.Info1Text}>Popularity: {movie.popularity}</p>
                                    <div className={classes.Genres}>
                                        {genres}
                                    </div>
                                </div>
                                <div className={classes.Info2}>
                                    <p className={classes.OverView}>{movie.overView}</p>
                                </div>
                                <div className={classes.MobileOnly}><Button clicked={() => showTrailer(movieId)} btnType="Success">PLAY TRAILER</Button></div>

                                <div className={classes.Info3}>
                                    <Tooltip title='Play Trailer' placement='top'>
                                        <PlayCircleFilledIcon className={classes.TrailerButton} style={{width: '150px', height: '150px'}} onClick={() => showTrailer(movieId)}/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <img className={classes.Backdrop} src={movie.backdropPath ? imgPath + 'original' + movie.backdropPath : imageError} /> 
                        <div className={classes.TopInfo}>
                            <div className={classes.Rate}>
                                <StarIcon style={{width: '40px', height: '40px'}}
                                    className={classes.StarIcon}/>
                                <div className={classes.Vote}>
                                    <p className={classes.VoteA}>
                                        {movie.voteAverage}<span className={classes.VoteA10}>/10</span>
                                    </p>
                                    <p className={classes.VoteC}>{movie.voteCount} Ratings</p>
                                </div>
                            </div>
                            {props.isAuthenticated ? addOrRemoveButton : null}
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