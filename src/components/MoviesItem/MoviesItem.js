import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

import { Link } from 'react-router-dom';
import classes from './MoviesItem.module.css';
import { checkIsInWatchList } from '../../shared/ultility';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import blank from '../../assets/blank.png';
import Genre from '../Genre/Genre';

const MoviesItem = props => {
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { watchList } = props;
    let btnRef = useRef();
    let infoRef = useRef();

    useEffect(() => {
        setIsInWatchList(checkIsInWatchList(props.movie.id, watchList))
    }, [watchList])

    const btnType = isInWatchList ? "RemoveBtn" : "AddBtn";
    let addOrRemoveButton = (
        props.isAuthenticated 
            ?   <div>
                    <p 
                        ref={ref => btnRef = ref} 
                        data-tip={isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}></p>
                    <input 
                        type="image" 
                        src={blank} 
                        ref ={btnRef}
                        className = {[classes.Button, classes[btnType]].join(' ')}
                        onClick = {isInWatchList
                            ? () => removeFromWatchList(props.userId, props.movie.id)
                            : () => addToWatchList(props.userId, props.movie)}
                        onMouseOver={ () => {ReactTooltip.show(btnRef)}}
                        onMouseOut={ ()=> {ReactTooltip.hide(btnRef)}}/>
                    <ReactTooltip 
                        place = "right"
                        offset = "{'top':-35}"
                        backgroundColor = "#ff8303"
                        textColor = "#1b1a17"
                        effect = "float"/>
                </div>
            : null
    )    
    let infoMovieButton = (
        <div>
            <p 
                ref={ref => infoRef = ref} 
                data-tip={"Release Date: "+ props.movie.releaseDay}></p>
            <input 
                type="image" 
                className={[classes.Button, classes.MovieInfo].join(' ')} 
                src={blank}
                onMouseOver={ () => {ReactTooltip.show(infoRef)}}
                onMouseOut={ ()=> {ReactTooltip.hide(infoRef)}}/>
            <ReactTooltip 
                place = "right"
                offset = "{'top':-35}"
                backgroundColor = "#ff8303"
                textColor = "#1b1a17"
                effect = "float"/>
        </div>
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
        return <Genre type = {genre} key={genre} />
    })

    return (
        <div className= {classes.Items}>
            <div className = {classes.BtnPosterContainer}>
                <input type='image' className={classes.PlayTrailerButton} src={blank} onClick={() => props.clicked(props.movie.id)}/>
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
            </div>
            <div className ={classes.sideBtn}>
                {addOrRemoveButton}
                {infoMovieButton}
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