import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Link } from 'react-router-dom';
import classes from './MoviesItem.module.css';
import { checkIsInWatchList, getGenre } from '../../shared/ultility';
import * as actions from '../../store/actions/index';

import Chip from '@material-ui/core/Chip';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

const MoviesItem = props => {
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { watchList } = props;

    useEffect(() => {
        setIsInWatchList(checkIsInWatchList(props.movie.id, watchList))
    }, [watchList])

    const btnType = isInWatchList ? "RemoveBtn" : "AddBtn";
    let addOrRemoveButton = (
        props.isAuthenticated 
            ?
            <Tooltip title={isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"} placement="right">
                  <FavoriteIcon 
                    className = {[classes.FavoriteButton, classes[btnType]].join(' ')}
                    onClick = {isInWatchList
                        ? () => removeFromWatchList(props.userId, props.movie.id)
                        : () => addToWatchList(props.userId, props.movie)} />
            </Tooltip>
            : null
    )    
    
    if(isLoading){
        addOrRemoveButton = <CircularProgress className={classes.Spinner} color="secondary" />
    }

    const addToWatchList = (userId, movie) => {
        setIsLoading(true);
        axios.post('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ userId +'/WatchList/'+ movie.id +'.json', movie)
        .then(res => { 
            props.fetchWatchList(userId);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const removeFromWatchList = (userId, movieId) => {
        setIsLoading(true);
        axios.delete('https://cinema-lovers-506de-default-rtdb.firebaseio.com/UserData/'+ userId +'/WatchList/'+ movieId +'.json')
        .then(res => { 
            props.fetchWatchList(userId);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const genres = props.movie.genres.map(genre => {
        return (
            <Chip key={genre} className = {classes.Chip} label={getGenre(genre)} />
        )
    })

    return (
        <div className= {classes.Items}>
            <div className = {classes.BtnPosterContainer}>
                <PlayCircleFilledIcon className={classes.PlayTrailerButton} onClick={() => props.clicked(props.movie.id)}/>
                <img className={classes.Poster} src={props.poster} />
            </div>
            <div className= {classes.MovieInfos}>
                <div className={classes.Title}>
                    <Link
                        to = {`/movies/${props.movie.id}`}>
                        {props.movie.title}
                    </Link>
                </div>
                <p className={classes.OverView}>{props.movie.overView}</p>
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

const mapStateToProps = state => {
    return {
        userId: state.authState.userId,
        watchList: state.watchListState.watchList,
        isAuthenticated: state.authState.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWatchList: (userId)=> dispatch(actions.fetchWatchList(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItem);