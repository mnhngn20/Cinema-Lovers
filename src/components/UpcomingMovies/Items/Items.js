import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import classes from './Items.module.css';
import { checkIsInWatchList, getGenre } from '../../../shared/ultility';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import blank from '../../../assets/blank.png';

import Chip from '@material-ui/core/Chip';

const Items = props => {
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { watchList } = props;

    useEffect(()=>{
        setIsInWatchList(checkIsInWatchList(props.movie.id, watchList))
    }, [watchList])

    const btnType = isInWatchList ? "RemoveBtn" : "AddBtn";
    let addOrRemoveButton = (
        props.isAuthenticated
            ? <div>
                <input 
                    type="image" 
                    src={blank} 
                    className = {[classes.Button, classes[btnType]].join(' ')}
                    onClick = {isInWatchList
                        ? () => removeFromWatchList(props.userId, props.movie.id)
                        : () => addToWatchList(props.userId, props.movie)}
                    />
            </div>
            : null
    )
    if(isLoading){
        addOrRemoveButton = <Spinner />
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
            <Chip className = {classes.Chip}label={getGenre(genre)} />
        )
    })

    return (
        <div className = {classes.Single}>
            <div className = {classes.Container}>
                <p className={classes.OverView}>{props.movie.overView}</p>
                <div className={classes.BtnContainer}>
                    <input type='image' className={classes.PlayTrailerButton} src={blank} onClick={() => props.clicked(props.movie.id)}/>
        
                    {addOrRemoveButton}
                </div>
                <img className={classes.Poster} src={props.poster} />
            </div>
            <div className={classes.Title}>
                <Link
                    to = {`/movies/${props.movie.id}`}>
                    {props.movie.title}
                </Link>
            </div>
            <div className={classes.Genres}>
                {genres}
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

export default connect(mapStateToProps, mapDispatchToProps)(Items);