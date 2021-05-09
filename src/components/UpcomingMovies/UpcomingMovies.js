import React, { useEffect} from 'react';
import {connect} from 'react-redux';

import classes from './UpcomingMovies.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import Items from './Items/Items';

const imgPath = 'https://image.tmdb.org/t/p/';

const imgWidth = 300;

const UpcomingMovies = props => {
    const {onFetchUpcomingMovies} = props;
    useEffect(()=> {
        onFetchUpcomingMovies();
    }, [onFetchUpcomingMovies])

    let upcomingMoviesList = <Spinner />
    if(!props.isloading){
        upcomingMoviesList = props.fetchedUpcomingMovies.map((movie) => {
            return (
                <Items
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
        <div className={classes.UpcomingMovies}>
            {upcomingMoviesList}
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