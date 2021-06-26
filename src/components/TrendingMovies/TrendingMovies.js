import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import classes from './TrendingMovies.module.css';
import MoviesItem from './MoviesItem/MoviesItem';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Pagination from './MoviesItem/Pagination/Pagination';
const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;
const options = {
    type: 'loop',
    autoplay: true,
    interval: '3000',
    speed: '500',
    pauseOnHover: true,
    rewind: true,
    classes: {arrows: classes.arrows, pagination: classes.pagination, isActive : classes.active},
    lazyLoad: 'nearby',
    preloadPages: 2
};

const TrendingMovies = ({isError, fetchedTrendingMovies, onFetchTrendingMovies, clicked, isloading}) => {
    const slideRef = useRef();
    const [trendingMovies, setTrendingMovies] = useState();
    const [page, setPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(()=>{
        console.log(page)
        onFetchTrendingMovies(page, setNumberOfPage, setTotalResults);
    },[onFetchTrendingMovies, page, setNumberOfPage, setTotalResults])
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
    },[fetchedTrendingMovies])
    return (
        fetchedTrendingMovies.length === 0 || isloading ? <div className={classes.Spinner}><Spinner /></div>
        : <div className= {classes.TrendingMovies}>
            {
                isError 
                ? <p className={classes.Error}>Could not load Trending Movies</p> 
                : <Splide options = {options} ref={slideRef}>
                    {trendingMovies}
                </Splide>
            }
            <div className={classes.Pagination}><Pagination totalResults={totalResults} quantity={numberOfPage} currentPage={page} setPage={setPage} /></div>
        </div>
    )
}

const mapState = state => ({
    isloading: state.trendingMoviesState.loading,
    fetchedTrendingMovies: state.trendingMoviesState.trendingMovies,
    isError: state.trendingMoviesState.error
})
const mapDispatchToProps = dispatch => ({
      onFetchTrendingMovies: (page , setNumberOfPage, setTotalResults) => dispatch(actions.fetchTrendingMovies(page , setNumberOfPage, setTotalResults)),
})
  
export default connect(mapState, mapDispatchToProps)(TrendingMovies);