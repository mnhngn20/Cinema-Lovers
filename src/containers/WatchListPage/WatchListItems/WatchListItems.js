import React from 'react';

import classes from './WatchListItems.module.css';
import MoviesItem from '../../../components/TrendingMovies/MoviesItem/MoviesItem';
import Blank from '../../../assets/blank.png';
import UserAvatar from '../../../components/UI/UserAvatar/UserAvatar';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const WatchListItems = ({watchList, clicked, userId, userData}) => {
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
            <div className={classes.Background}></div>
            <div className={classes.OptionBox}>
                <UserAvatar userId={userId} userData={userData} />
            </div>
            <div>
                {watchlist}
            </div>
        </div>
    )
}

export default WatchListItems;