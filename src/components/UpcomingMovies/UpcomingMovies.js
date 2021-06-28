import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import classes from './UpcomingMovies.module.css';
import * as actions from '../../store/actions/index';
import Items from './Items/Items';
import Spinner from '../UI/Spinner/Spinner'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Pagination from '../Pagination/Pagination';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;
const options = {
    type: 'loop',
    speed: '200',
    rewind: true,
    classes: {arrows: classes.arrows, pagination: classes.pagination},
    fixedWidth: '100vw',
    perPage: 3
};

const UpcomingMovies = ({isError, fetchedUpcomingMovies, clicked, onFetchUpcomingMovies}) => {
    const [upcomingMovies, setUpcomingMovies] = useState();
    const [page, setPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    
    useEffect(()=>{
        onFetchUpcomingMovies(page, setNumberOfPage, setTotalResults);
    }, [onFetchUpcomingMovies, page, setNumberOfPage, setTotalResults]);

    useEffect(()=>{
        if(fetchedUpcomingMovies){
            setUpcomingMovies(fetchedUpcomingMovies.map((movie) => {
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
            }))
        }
    }, [fetchedUpcomingMovies, clicked])

    return (
        fetchedUpcomingMovies.length === 0 ? <div className={classes.spinner}><Spinner /></div>
        :<div>
            {
                isError 
                ? <p className={classes.Error}>Could not load Upcoming Movies</p>
                : <div>
                    <div className={classes.UpcomingMovies}>
                        {upcomingMovies}
                    </div>
                    <div className={classes.UpcomingMoviesMobile}>
                        <Splide options = {options}>
                            {upcomingMovies}
                        </Splide>
                    </div>
                </div>
            }
            <div className={classes.Pagination}><Pagination totalResults={totalResults} quantity={numberOfPage} currentPage={page} setPage={setPage} /></div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        fetchedUpcomingMovies: state.upcomingMoviesState.upcomingMovies,
        isError: state.upcomingMoviesState.error,
        isLoading: state.upcomingMoviesState.loading
    }
}
const mapDispatchToProps = dispatch => {
    return{
      onFetchUpcomingMovies: (page, setNumberOfPage, setTotalResults) => dispatch(actions.fetchUpcomingMovies(page, setNumberOfPage, setTotalResults))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);