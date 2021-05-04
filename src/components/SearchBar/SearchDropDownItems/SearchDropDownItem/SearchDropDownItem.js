import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchDropDownItem.module.css';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const SearchDropDownItem = props => {
    return (
        <div className={classes.SearchDropDownItem} >
            <div><img src={imgPath + 'w' + imgWidth + props.posterPath}/></div>
            <div className={classes.MovieInfo} onClick = {props.clicked}>
                <Link
                   to = {`/movies/${props.movieId}`}>
                    {props.title}
                </Link>
                <p>{props.releaseDate}</p>
            </div> 
        </div>
    )
}

export default SearchDropDownItem;