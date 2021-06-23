import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './MoviesItem.module.css';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton';
import * as actions from '../../../store/actions/index';
import { checkIsInWatchList, getGenre, addToWatchList, removeFromWatchList, setWatchForWatchList} from '../../../shared/ultility';
import Score from '../../UI/Score/Score';
import VisibilityIcon from '@material-ui/icons/Visibility';
import imageErrorPoster from '../../../assets/blank.png';

const MoviesItem = ({watchList, movie, isAuthenticated, clicked, poster, watched, onUpdateWatchList}) => {
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    useEffect(() => {
        setIsInWatchList(checkIsInWatchList(movie.id, watchList))
    }, [watchList, movie])

    useEffect(()=> {
        if(watched){
            setIsWatched(watched);
        }
    }, [watched, movie])

    const updateWL = (movie, watched) => {
        setWatchForWatchList(movie, watched);
        setIsWatched(watched);
    }

    let addOrRemoveButton =  <FavoriteButton isAuthenticated={isAuthenticated} isInWatchList={isInWatchList}
                                toolTipPlacement="top" 
                                clicked={isInWatchList
                                    ? () => removeFromWatchList(watchList, onUpdateWatchList, movie.id, setIsInWatchList)
                                    : () => addToWatchList(watchList, onUpdateWatchList, movie, setIsInWatchList)} 
                                type="MovieItemType"/>

    const genres = movie.genres.map(genre => {
        if(getGenre(genre) !== 'Undefined')
            return (
                <Chip key={genre} className={classes.Chip} label={getGenre(genre)} />
            )
        return null
    })
    
    let genresText = '';
    for(let key in movie.genres){
        if(movie.genres[key] !== 'Undefined')
            genresText += getGenre(movie.genres[key]) + ", ";
    }
    genresText = genresText.slice(0, genresText.length-2);

    return (
        <div className= {classes.Items}>
            <div className = {classes.BtnPosterContainer}>
                <PlayCircleFilledIcon className={classes.PlayTrailerButton} onClick={() => clicked(movie.id)}/>
                <img className={classes.Poster} src={movie.posterPath ? poster : imageErrorPoster} alt="img"/>
            </div>
            <div className= {classes.MovieInfos}>
                <div className={classes.Title}>
                    <Link
                        to = {`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </div>
                <div className={classes.Score}>
                    <Score type="black" voteAverage={movie.voteAverage} voteCount={movie.voteCount}/>
                </div>
                <p className={classes.ReleaseDate}>Release Date: {movie.releaseDay}</p>
                <p className={classes.GenresText}>{genresText}</p>
                <p className={classes.OverView}>{movie.overView}</p>
                <div className={classes.Genres}>
                    {genres}
                </div>
                <div className={classes.FButton}>
                    {isWatched ? <VisibilityIcon className={classes[isWatched]} onClick={()=>updateWL(movie, isWatched === 'yes' ? 'no' : 'yes')} /> : null}
                    {addOrRemoveButton}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    watchList: state.watchListState.watchList,
    isAuthenticated: state.authState.isAuth
})

const mapDispatchToProps = dispatch => ({
    onUpdateWatchList: (watchList) => dispatch(actions.updateWatchList(watchList))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItem);