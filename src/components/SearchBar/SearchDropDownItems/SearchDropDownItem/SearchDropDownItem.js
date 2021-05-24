import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchDropDownItem.module.css';
import imageErrorPoster from '../../../../assets/imageErrorPoster.jpg';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const SearchDropDownItem = props => {
    return (
        <div className={classes.SearchDropDownItem} >
            <img src={props.posterPath ? imgPath + 'w' + imgWidth + props.posterPath : imageErrorPoster}/>
            <div className={classes.MovieInfo} onClick = {props.clicked}>
                <Link
                   to = {`/movies/${props.movieId}`}>
                    {props.title}
                </Link>
                <p>Release Date: {props.releaseDate}</p>
            </div> 
        </div>
    )
}

export default SearchDropDownItem;