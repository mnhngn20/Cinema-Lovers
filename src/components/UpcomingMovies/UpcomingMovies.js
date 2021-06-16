import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './UpcomingMovies.module.css';
import * as actions from '../../store/actions/index';
import Items from './Items/Items';
import Spinner from '../UI/Spinner/Spinner'
import CircularProgress from '@material-ui/core/CircularProgress';

const imgPath = 'https://image.tmdb.org/t/p/';

const imgWidth = 300;

const UpcomingMovies = props => {
    const {onFetchUpcomingMovies, isError} = props;
    useEffect(()=> {
        onFetchUpcomingMovies();
    }, [onFetchUpcomingMovies])

    let upcomingMoviesList = <CircularProgress className={classes.Spinner} />
    if(!props.isloading){
        upcomingMoviesList = props.fetchedUpcomingMovies.map((movie) => {
            return (
                <Items
                    key={movie.id}
                    id = {movie.id}
                    clicked = {props.clicked}
                    movie = {movie}
                    poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                    title = {movie.title}>
                </Items>
            )
        })
    }

    return (
        props.isLoading ? <div className={classes.spinner}><Spinner /></div>
        :<div>
            {
                props.isError 
                ? <p className={classes.Error}>Could not load Upcoming Movies</p>
                : <div className={classes.UpcomingMovies}>
                    {upcomingMoviesList}
                </div>
            }
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.upcomingMoviesState.loading,
        fetchedUpcomingMovies: state.upcomingMoviesState.upcomingMovies,
        isError: state.upcomingMoviesState.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUpcomingMovies: () => dispatch(actions.fetchUpcomingMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);