import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Items.module.css';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton';
import * as actions from '../../../store/actions/index';
import { checkIsInWatchList, getGenre, addToWatchList, removeFromWatchList } from '../../../shared/ultility';
import blankImg from '../../../assets/imageErrorPoster.jpg';

const Items = ({watchList, movie, isAuthenticated, userId, fetchWatchList, poster, clicked}) => {
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsInWatchList(checkIsInWatchList(movie.id, watchList))
    }, [watchList])

    const genres = movie.genres.map(genre => {
        if(getGenre(genre) != 'Undefined')
            return (
                <Chip key={genre} className = {classes.Chip} label={getGenre(genre)} />
            )
    })

    return (
        <div className = {classes.Single}>
            <div className = {classes.Container}>
                <p className={classes.OverView}>{movie.overView}</p>
                <div className={classes.BtnContainer}>
                    <Tooltip title="Play Trailer" placement="top">
                        <PlayCircleFilledIcon className={classes.PlayTrailerButton} onClick={() => clicked(movie.id)}/>
                    </Tooltip>
                    <div className={classes.FavContainer}>
                        <FavoriteButton isAuthenticated={isAuthenticated} isLoading={isLoading} 
                            isInWatchList={isInWatchList} toolTipPlacement="top"
                            clicked={isInWatchList
                                ? () => removeFromWatchList(userId, movie.id, setIsLoading, fetchWatchList)
                                : () => addToWatchList(userId, movie, setIsLoading, fetchWatchList)}
                            type="ItemType"/>
                    </div>
                    
                </div>
                {console.log(poster)}
                <img className={classes.Poster} src={poster !== '' ? poster : blankImg} />
            </div>
            <div className={classes.Title}>
                <Link
                    to = {`/movies/${movie.id}`}>
                    {movie.title}
                </Link>
            </div>
            <div className={classes.Genres}>
                {genres}
            </div>  
        </div>
    )
}

const mapState = state => {
    return {
        userId: state.authState.userId,
        watchList: state.watchListState.watchList,
        isAuthenticated: state.authState.token != null
    }
}

const mapDispatch = dispatch => {
    return {
        fetchWatchList: (userId)=> dispatch(actions.fetchWatchList(userId))
    }
}

export default connect(mapState, mapDispatch)(Items);