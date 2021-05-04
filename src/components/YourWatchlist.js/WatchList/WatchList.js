import React from 'react';
import { connect } from 'react-redux';

import classes from './WatchList.module.css';
import MoviesItem from '../../MoviesItem/MoviesItem';

const imgPath = 'https://image.tmdb.org/t/p/';

const imgWidth = 300;

const WatchList = props => {
    let list = null;
    if(props.watchList){
        list = props.watchList.map(movie =>{
            return (
                <MoviesItem 
                    clicked = {props.clicked}
                    movie={movie}
                    poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                    key={movie.id}
                    title = {movie.title}>
                </MoviesItem>
            )
        })
    }

    return (
        <div className={classes.WatchList}>
            { props.isAuthenticated ? list : <p>PLEASE LOG IN TO CONTINUE...</p>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watchList: state.watchListState.watchList,
        isAuthenticated: state.authState.token !== null
    }
}

export default connect(mapStateToProps, null)(WatchList);