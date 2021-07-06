import React, {useMemo} from 'react';

import classes from './MovieInfo.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '../../../components/UI/Button/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Chip from '@material-ui/core/Chip';
import {getGenre} from '../../../shared/ultility';
const MovieInfo = ({movie, addOrRemoveButton, showTrailer}) => {
    let genres = useMemo(()=>movie.genres.map(genre => {
        return (
            <Chip key={genre.id} className={classes.Chip} label={getGenre(genre.id)} />
        )
    }),[movie])
    return (
        <div className={classes.MovieInfo}>
            <div className={classes.TitleContainer}>
                <p className={classes.Title}>{movie.title}</p>
            </div>
            <div className={classes.Info}>
                <div className={classes.Info1}>
                    <p className = {[classes.Info1Text, classes.MobileOnly].join(' ')}>Score: {movie.voteAverage}/10</p>
                    <p className = {[classes.Info1Text, classes.MobileOnly].join(' ')}>{movie.voteCount} Ratings</p>
                    {movie.runtime? <p className={classes.Info1Text}>Length: {movie.runtime}</p> : null}
                    <p className={classes.Info1Text}>Release Date: {movie.releaseDay}</p>
                    <p className={classes.Info1Text}>Status: {movie.status}</p>
                    <p className = {classes.Info1Text}>Popularity: {movie.popularity}</p>
                    <div className={classes.Genres}>
                        {genres}
                    </div>
                </div>
                <div className={classes.Info2}>
                    <p className={classes.OverView}>{movie.overView}</p>
                </div>
                <div className={classes.MobileOnly}>
                    <Button clicked={() => showTrailer(movie.id)} btnType="Success">PLAY TRAILER</Button>
                    {addOrRemoveButton}
                </div>
                <div className={classes.Info3}>
                    <Tooltip title='Play Trailer' placement='top'>
                        <PlayCircleFilledIcon className={classes.TrailerButton} style={{width: '150px', height: '150px'}} onClick={() => showTrailer(movie.id)}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo;