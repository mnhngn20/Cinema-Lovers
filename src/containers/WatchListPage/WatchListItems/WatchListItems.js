import React, {useState, useEffect} from 'react';

import classes from './WatchListItems.module.css';
import MoviesItem from '../../../components/TrendingMovies/MoviesItem/MoviesItem';
import UserAvatar from '../../../components/UI/UserAvatar/UserAvatar';
import Select from '../Select/Select';

const imgPath = 'https://image.tmdb.org/t/p/';
const imgWidth = 300;

const WatchListItems = ({watchList, clicked, userId, userData}) => {
    const [countMovie, setCountMovie] = useState(0);
    const [select, setSelect] = useState(1);
    const watchlist = watchList.map(movie => {
        if(select === 1){
            if(movie.watched === 'yes'){
                return (
                    <MoviesItem
                        setCountMovie = {setCountMovie}
                        watched = {movie.watched}
                        clicked = {clicked}
                        movie = {movie}
                        poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                        key={movie.id} 
                        title = {movie.title}></MoviesItem>
                )
            }
        } else if(select === 2){
            if(movie.watched === 'no'){
                return (
                    <MoviesItem
                        setCountMovie = {setCountMovie}
                        watched = {movie.watched}
                        clicked = {clicked}
                        movie = {movie}
                        poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                        key={movie.id} 
                        title = {movie.title}></MoviesItem>
                )
            }
        } else return (
            <MoviesItem
                setCountMovie = {setCountMovie}
                watched = {movie.watched}
                clicked = {clicked}
                movie = {movie}
                poster = {imgPath + 'w' + imgWidth + movie.posterPath}
                key={movie.id} 
                title = {movie.title}></MoviesItem>
        )
        
    });
    useEffect(()=>{
        let count = 0;
        for(let key in watchList){
            if(watchList[key].watched === 'yes'){
                count++;
            }
        }
        setCountMovie(count);
        console.log(watchList.length)
    }, [])
    const sortChange = (event) => {
        setSelect(event.target.value)
    }
    return (
        <div className = {classes.WatchListItems}>
            <div className={classes.Box}>
                <div className={classes.Background}></div>
                <div className={classes.Options}>
                    <UserAvatar userId={userId} userData={userData} />
                    <div className={classes.Option}>
                        <p className={classes.Name}>{userData.firstName +" "+ userData.lastName + "'s WatchList"}</p>
                        <p className={classes.Quote}>{
                            watchList.length === 0 
                            ? "You haven't added any favorite movie, let's go to main page to add one :)." 
                            :watchList.length === 1 ? "You only have one movie in your Watchlist? That's terrible!" 
                            :"You have watched "+ countMovie +"/"+ watchList.length +" films of your Watchlist." 
                        }</p>
                        <div className={classes.Select}>
                            <Select handleChange={sortChange}
                                select={select}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {watchlist}
            </div>
        </div>
    )
}

export default WatchListItems;