import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './MoviesItem.module.css';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteButton from '../UI/FavoriteButton/FavoriteButton';
import * as actions from '../../store/actions/index';
import { checkIsInWatchList, getGenre, addToWatchList, removeFromWatchList } from '../../shared/ultility';

const MoviesItem = ({watchList, movie, isAuthenticated, userId, fetchWatchList, clicked, poster}) => {
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsInWatchList(checkIsInWatchList(movie.id, watchList))
    }, [watchList])

    let addOrRemoveButton =  <FavoriteButton isAuthenticated={isAuthenticated} isInWatchList={isInWatchList}
                                toolTipPlacement="top" isLoading={isLoading} 
                                clicked={isInWatchList
                                    ? () => removeFromWatchList(userId, movie.id, setIsLoading, fetchWatchList)
                                    : () => addToWatchList(userId, movie, setIsLoading, fetchWatchList)} 
                                type="MovieItemType"/>

    const genres = movie.genres.map(genre => {
        if(getGenre(genre) != 'Undefined')
            return (
                <Chip key={genre} className={classes.Chip} label={getGenre(genre)} />
            )
    })
    
    let genresText = '';
    for(let key in movie.genres){
        if(movie.genres[key] != 'Undefined')
            genresText += getGenre(movie.genres[key]) + ", ";
    }
    genresText = genresText.slice(0, genresText.length-2);

    return (
        <div className= {classes.Items}>
            <div className = {classes.BtnPosterContainer}>
                <PlayCircleFilledIcon className={classes.PlayTrailerButton} onClick={() => clicked(movie.id)}/>
                <img className={classes.Poster} src={poster} />
            </div>
            <div className= {classes.MovieInfos}>
                <div className={classes.Title}>
                    <Link
                        to = {`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </div>
                <p className={classes.GenresText}>{genresText}</p>
                <p className={classes.OverView}>{movie.overView}</p>
                <div className={classes.Genres}>
                    {genres}
                </div>
                <div className={classes.FButton}>
                    {addOrRemoveButton}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.authState.userId,
    watchList: state.watchListState.watchList,
    isAuthenticated: state.authState.token != null
})

const mapDispatchToProps = dispatch => ({
    fetchWatchList: (userId)=> dispatch(actions.fetchWatchList(userId))

})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItem);