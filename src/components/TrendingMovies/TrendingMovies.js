import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import classes from './TrendingMovies.module.css';
import MoviesItem from './MoviesItem/MoviesItem';
import * as actions from '../../store/actions/index';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Spinner from '../UI/Spinner/Spinner';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;
const options = {
    type: 'loop',
    autoplay: false,
    interval: '3000',
    speed: '500',
    pauseOnHover: true,
    rewind: true,
    classes: {arrows: classes.arrows, pagination: classes.pagination},
    lazyLoad: 'nearby',
    preloadPages: 2
};

const TrendingMovies = ({onFetchTrendingMovies, isloading, isError, fetchedTrendingMovies, clicked}) => {
    useEffect(()=>{
        onFetchTrendingMovies();
    }, [onFetchTrendingMovies])
    const slideRef = useRef();
    let trendingMoviesList = null
    if(!isloading && !isError){
        trendingMoviesList = fetchedTrendingMovies.map((movie) => {
            return (
                <SplideSlide key={movie.id}>
                    <MoviesItem
                        clicked = {clicked}
                        movie = {movie}
                        poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                        title = {movie.title}></MoviesItem>
                </SplideSlide>
            )
        })
    }
    return (
        isloading ? <div className={classes.Spinner}><Spinner /></div>
        : <div className= {classes.TrendingMovies}>
            {
                isError 
                ? <p className={classes.Error}>Could not load Trending Movies</p> 
                : <Splide options = {options} ref={slideRef}>
                    {trendingMoviesList}
                </Splide>
            }
        </div>
    )
}

const mapState = state => ({
    isloading: state.trendingMoviesState.loading,
    fetchedTrendingMovies: state.trendingMoviesState.trendingMovies,
    isError: state.trendingMoviesState.error
})

const mapDispatch = dispatch => ({
    onFetchTrendingMovies: () => dispatch(actions.fetchTrendingMovies()) 

})
export default connect(mapState, mapDispatch)(TrendingMovies);