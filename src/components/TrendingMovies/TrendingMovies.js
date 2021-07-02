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
    autoplay: true,
    interval: '3000',
    speed: '200',
    pauseOnHover: true,
    rewind: true,
    classes: {arrows: classes.arrows, pagination: classes.pagination, isActive : classes.active},
    lazyLoad: 'nearby',
    preloadPages: 2
};

const TrendingMovies = ({isError, fetchedTrendingMovies, onFetchTrendingMovies, clicked, isloading}) => {
    const slideRef = useRef();
    const [trendingMovies, setTrendingMovies] = useState();

    useEffect(()=>{
        onFetchTrendingMovies();
    },[onFetchTrendingMovies])

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
    },[fetchedTrendingMovies, clicked, setTrendingMovies]);

    return (
        fetchedTrendingMovies.length === 0 ? <div className={classes.Spinner}><Spinner /></div>
        : <div className={classes.TrendingMovies}>
                {
                    isError 
                    ? <p className={classes.Error}>Could not load Trending Movies</p> 
                    : <div className= {classes.TrendingMovies}>
                        <Splide options = {options} ref={slideRef}>
                            {trendingMovies}
                        </Splide>
                    </div>
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