import React from 'react';
import {connect} from 'react-redux';

import classes from './WatchListItems.module.css';
import MoviesItem from '../../../components/TrendingMovies/MoviesItem/MoviesItem';
import Blank from '../../../assets/blank.png';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const WatchListItems = ({watchList, clicked}) => {
    const watchlist = watchList.map(movie => {
        return (
            <MoviesItem
                watched = {movie.watched}
                clicked = {clicked}
                movie = {movie}
                poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                key={movie.id} 
                title = {movie.title}></MoviesItem>
        )
    })
    return (
        <div className = {classes.WatchListItems}>
            <div className={classes.OptionBox}>
            </div>
            <div>
                {watchlist}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    userData: state.authState.userData
})

export default connect(mapStateToProps, null)(WatchListItems);