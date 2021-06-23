import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchDropDownItem.module.css';
import imageErrorPoster from '../../../../assets/blank.png';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const SearchDropDownItem = ({posterPath, clicked, title, movieId, releaseDate})=> {
    return (
        <div className={classes.SearchDropDownItem} >
            <img src={posterPath ? imgPath + 'w' + imgWidth + posterPath : imageErrorPoster} alt="img"/>
            <div className={classes.MovieInfo} onClick = {clicked}>
                <Link
                   to = {`/movies/${movieId}`}>
                    {title}
                </Link>
                <p>Release Date: {releaseDate}</p>
            </div> 
        </div>
    )
}

export default SearchDropDownItem;