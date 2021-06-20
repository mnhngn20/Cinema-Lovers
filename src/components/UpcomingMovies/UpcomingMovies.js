import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './UpcomingMovies.module.css';
import * as actions from '../../store/actions/index';
import Items from './Items/Items';
import Spinner from '../UI/Spinner/Spinner'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const imgPath = 'https://image.tmdb.org/t/p/';

const imgWidth = 300;

const UpcomingMovies = ({onFetchUpcomingMovies, isError, fetchedUpcomingMovies, isLoading, clicked}) => {
    useEffect(()=> {
        onFetchUpcomingMovies();
    }, [onFetchUpcomingMovies])

    const options = {
        type: 'loop',
        speed: '500',
        rewind: true,
        classes: {arrows: classes.arrows},
        fixedWidth: '100vw',
        perPage: 3
    };

    let upcomingMoviesList = <CircularProgress className={classes.Spinner} />
    if(!isLoading){
        upcomingMoviesList = fetchedUpcomingMovies.map((movie) => {
            return (
                <SplideSlide key={movie.id}>
                    <Items
                        id = {movie.id}
                        clicked = {clicked}
                        movie = {movie}
                        poster = {movie.posterPath ? imgPath + 'w' + imgWidth + movie.posterPath : ''}
                        title = {movie.title}>
                    </Items>
                </SplideSlide>
            )
        })
    }

    return (
        isLoading ? <div className={classes.spinner}><Spinner /></div>
        :<div>
            {
                isError 
                ? <p className={classes.Error}>Could not load Upcoming Movies</p>
                : <div>
                    <div className={classes.UpcomingMovies}>
                        {upcomingMoviesList}
                    </div>
                    <div className={classes.UpcomingMoviesMobile}>
                        <Splide options = {options}>
                            {upcomingMoviesList}
                        </Splide>
                    </div>
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