import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './MoviesItem.module.css';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton';
import * as actions from '../../../store/actions/index';
import { checkIsInWatchList, getGenre, addToWatchList, removeFromWatchList, updateWatchList} from '../../../shared/ultility';
import Score from '../../UI/Score/Score';
import VisibilityIcon from '@material-ui/icons/Visibility';

const MoviesItem = ({watchList, movie, isAuthenticated, userId, fetchWatchList, clicked, poster, watched}) => {
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
        console.log(watched)
        updateWatchList(movie, watched);
        setIsWatched(watched);
    }

    let addOrRemoveButton =  <FavoriteButton isAuthenticated={isAuthenticated} isInWatchList={isInWatchList}
                                toolTipPlacement="top" 
                                clicked={isInWatchList
                                    ? () => removeFromWatchList(userId, movie.id, fetchWatchList)
                                    : () => addToWatchList(userId, movie, fetchWatchList)} 
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
                <img className={classes.Poster} src={poster} alt="img"/>
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
    userId: state.authState.userId,
    watchList: state.watchListState.watchList,
    isAuthenticated: state.authState.isAuth
})

const mapDispatchToProps = dispatch => ({
    fetchWatchList: (userId)=> dispatch(actions.fetchWatchList(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItem);