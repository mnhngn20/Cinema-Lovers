import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import classes from './TrendingMovies.module.css';
import MoviesItem from '../MoviesItem/MoviesItem';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const imgPath = 'https://image.tmdb.org/t/p/';

const imgWidth = 300;

const TrendingMovies = props => {
    const {onFetchTrendingMovies} = props
    useEffect(()=>{
        onFetchTrendingMovies();
    }, [onFetchTrendingMovies])

    const options = {
        type: 'loop'
    };

    let trendingMoviesList = <Spinner />
    if(!props.isloading){
        trendingMoviesList = props.fetchedTrendingMovies.map((movie) => {
            return (
                <SplideSlide key={movie.id}>
                    <MoviesItem
                        clicked = {props.clicked}
                        movie = {movie}
                        poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                        title = {movie.title}></MoviesItem>
                </SplideSlide>
            )
        })
    }

    return (
        <div className= {classes.TrendingMovies}>
            <p className={classes.Trending}>TRENDING</p>
                <Splide options = {options}>
                    {trendingMoviesList}
                </Splide>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isloading: state.trendingMoviesState.loading,
        fetchedTrendingMovies: state.trendingMoviesState.trendingMovies,
        isError: state.trendingMoviesState.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTrendingMovies: () => dispatch(actions.fetchTrendingMovies()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);