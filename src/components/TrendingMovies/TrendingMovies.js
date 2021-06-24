import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import classes from './TrendingMovies.module.css';
import MoviesItem from './MoviesItem/MoviesItem';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

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

const TrendingMovies = ({isError, fetchedTrendingMovies, onFetchTrendingMovies, clicked}) => {
    const slideRef = useRef();
    const [trendingMovies, setTrendingMovies] = useState();
    useEffect(()=>{
        if(fetchedTrendingMovies.length === 0) onFetchTrendingMovies();
    }, [onFetchTrendingMovies]);
    useEffect(()=>{
        if(fetchedTrendingMovies){
            setTrendingMovies(fetchedTrendingMovies.map((movie) => {
                return (
                    <SplideSlide key={movie.id}>
                        <MoviesItem
                            clicked = {clicked}
                            movie = {movie}
                            poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                            title = {movie.title}></MoviesItem>
                    </SplideSlide>
                )
            }))
        }
    })
    return (
        fetchedTrendingMovies.length === 0 ? <div className={classes.Spinner}><Spinner /></div>
        : <div className= {classes.TrendingMovies}>
            {
                isError 
                ? <p className={classes.Error}>Could not load Trending Movies</p> 
                : <Splide options = {options} ref={slideRef}>
                    {trendingMovies}
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
const mapDispatchToProps = dispatch => ({
      onFetchTrendingMovies: () => dispatch(actions.fetchTrendingMovies()),
})
  
export default connect(mapState, mapDispatchToProps)(TrendingMovies);