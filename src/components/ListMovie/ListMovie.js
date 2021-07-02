import React from 'react';

import Item from '../UpcomingMovies/Items/Items';
import classes from './ListMovie.module.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;
const options = {
    type: 'loop',
    speed: '500',
    rewind: true,
    classes: {arrows: classes.arrows, pagination: classes.pagination},
    fixedWidth: '100vw',
    perPage: 3
};
const ListMovie = ({list, title, quantity}) => {
    let clone = [...list];
    const favorites= clone.splice(0, clone.length < quantity ? clone.length + 1 : quantity).map(movie => {
        return (
            <SplideSlide key={movie.id}>
                <Item 
                    key={movie.id}
                    id = {movie.id}
                    noTrailer = {true}
                    movie = {movie}
                    poster = {movie.posterPath ? imgPath + 'w' + imgWidth + movie.posterPath : ''}
                    title = {movie.title}
                />
            </SplideSlide>
        ) 
    })
    
    return (
        <div className={classes.container}>
            <h1>{title}</h1>
            <div className={classes.Favorites}>
                {favorites}
            </div>
            <div className={classes.FavoritesMobile}>
                <Splide options = {options}>
                    {favorites}
                </Splide>
            </div>
        </div>
    )
}

export default ListMovie;