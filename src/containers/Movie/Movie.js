import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-movies';
import classes from './Movie.module.css'
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';
import { checkIsInWatchList, addToWatchList, removeFromWatchList, showTrailer, convertMtoH } from '../../shared/ultility';
import * as actions from '../../store/actions/index';
import imageError from '../../assets/imageError.jpg'
import FavoriteButton from '../../components/UI/FavoriteButton/FavoriteButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Score from '../../components/UI/Score/Score';
import MovieInfo from './MovieInfo/MovieInfo';
import ListMovie from '../../components/ListMovie/ListMovie';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const imgPath = 'https://image.tmdb.org/t/p/';

const Movie = ({match, watchList, isAuthenticated, onUpdateWatchList}) => {
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(false);
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [list, setList] = useState();
    const movieId = useMemo(()=>match.params.id, [match]);

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
                    popularity: res.data.popularity,
                    runtime: convertMtoH(res.data.runtime)
            };
            setMovie(fetchedMovie);
        }).catch(err => {
            console.log(err);
        })
        axios.get('/movie/'+ movieId+'/similar?api_key=ccc040ef39e5eace4f5cd8028421f9f1&language=en-US&page=1').then(
            res => {
                let fetchedMovies = [];
                let fetchedMovie = null;
                for(let key in res.data.results){
                    fetchedMovie = {
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
                    fetchedMovies.push(fetchedMovie);
                }
                setList(<ListMovie quantity={20} list={fetchedMovies} title="YOU MIGHT ALSO LIKE"/>)
                setLoading(false);
            }
        ).catch(err => console.log(err))
    }, [movieId]);

    const hideModal = () => {
        setShowingTrailer(false);
        setTrailerPath('');
    }
    const refactorMovie = (movie) => {
        const refactoredMovie = {
            ...movie, 
            genres: movie.genres.map((genre) => genre.id)
        }
        return refactoredMovie
    }
    let addOrRemoveButton = <FavoriteButton isAuthenticated={isAuthenticated} isInWatchList={isInWatchList}
                                toolTipPlacement="right"  
                                clicked={isInWatchList
                                    ? () => removeFromWatchList(watchList, onUpdateWatchList, movie.id, setIsInWatchList)
                                    : () => addToWatchList(watchList, onUpdateWatchList ,refactorMovie(movie), setIsInWatchList)}
                                    type= "MovieType"/>
    let movieInfo = useMemo(()=>
        movie && !loading
            ? <div className={classes.MovieContainer}>
                <div className={classes.BackGround}>
                </div>
                <div className={classes.BackdropContainer}>
                    <MovieInfo 
                        movie={movie} 
                        addOrRemoveButton={addOrRemoveButton} 
                        showTrailer={
                            (movieId) => showTrailer(movieId, setShowingTrailer, setTrailerPath)
                        }/>
                    <LazyLoadImage 
                        effect="blur"
                        width="auto"
                        height="auto"
                        className={classes.Backdrop} 
                        src={movie.backdropPath ? imgPath + 'original' + movie.backdropPath : imageError} 
                        alt="img"/> 
                    <div className={classes.TopInfo}>
                        <div className={classes.Rate}>
                            <Score voteCount={movie.voteCount} voteAverage={movie.voteAverage} />
                        </div>
                        {addOrRemoveButton}
                    </div>
                </div>
            </div> : <div className={classes.Spinner}><Spinner /></div>
    ,[movie, loading, addOrRemoveButton])

    return (
        <div className={classes.Movie}>
            <Modal show = {showingTrailer}
                modalType = "Trailer"
                modalClosed = {hideModal}>
                <Trailer trailerPath = {trailerPath} />
            </Modal>
            {movieInfo}
            {list}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.authState.userId,
        watchList: state.watchListState.watchList,
        isAuthenticated: state.authState.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateWatchList: (watchList) => dispatch(actions.updateWatchList(watchList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);