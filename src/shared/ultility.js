import axios from 'axios';
import {database} from '../instance/Firebase';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,...updatedProperties
        }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.isEmail){
        const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        isValid = pattern.test(value) && isValid;
    }
    if(rules.isNumberic){
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid; 
}

export const checkIsInWatchList = (movieId, watchList) => {
    let isIn = false;
    for(let key in watchList){
        if (movieId === watchList[key].id) isIn=true;
    }
    return isIn;
}

export const getGenre = code => {
    let genre = '';
    switch (code){
        case 28:
            genre = "Action";
            break;
        case 12:
            genre = "Adventure";
            break;
        case 16:
            genre = "Animation";
            break;
        case 35:
            genre = "Comedy";
            break;
        case 80:
            genre = "Crime";
            break;
        case 99:
            genre = "Documentary";
            break;
        case 18:
            genre = "Drama";
            break;
        case 10751:
            genre = "Family";
            break;
        case 14:
            genre = "Fantasy";
            break;
        case 36:
            genre = "History";
            break;
        case 27:
            genre = "Horror";
            break;
        case 10402:
            genre = "Music";
            break;            
        case 9648:
            genre = "Mystery";
            break;            
        case 10749:
            genre = "Romance";
            break;            
        case 878:
            genre = "Science Fiction";
            break;
        case 10770:
            genre = "TV Movie";
            break;
        case 53:
            genre = "Thriller";
            break;
        case 10752:
            genre = "War";
            break;
        case 37:
            genre = "Western";
            break;  
        default:
            genre = "Undefined";
            break;  
    }
    return genre;
}
export const addToWatchList = (watchList, updateWatchList ,movie, setIsInWatchList) => {
    if(movie){
        const newMovie = {
            ...movie, 
            watched: 'no'
        }
        watchList.push(newMovie);
        updateWatchList(watchList);
        database.ref("UserData/"+ localStorage.getItem("userId") + "/WatchList/" + movie.id).set(newMovie);
        setIsInWatchList(true);
    }
}

export const removeFromWatchList = (watchList, updateWatchList, movieId, setIsInWatchList) => {
    let position = 0;
    for(let key in watchList){
        if(watchList[key].id === movieId){
            break;
        }
        else position++;
    }
    watchList.splice(position, 1);
    updateWatchList(watchList);
    database.ref("UserData/"+ localStorage.getItem("userId") + "/WatchList/" + movieId).remove()
    setIsInWatchList(false);
}

export const showTrailer = (movieId, setShowingTrailer, setTrailerPath) => {
    setShowingTrailer(true);
    axios.get('https://api.themoviedb.org/3/movie/'
        + movieId +
        '/videos?api_key=ccc040ef39e5eace4f5cd8028421f9f1&language=en-US')
    .then(res => {
        setTrailerPath(res.data.results[0].key ? res.data.results[0].key : "err")
    })
    .catch(err => {
        console.log(err);
    })
}

export const setWatchForWatchList = (watchList, updateWatchList, movie, watched) => {
    const newMovie = {
        ...movie, 
        watched: watched
    }
    let position = 0;
    for(let key in watchList){
        if(watchList[key].id === movie.id){
            break;
        }
        else position++;
    }
    watchList.splice(position, 1, newMovie);
    updateWatchList(watchList);
    database.ref("UserData/"+ localStorage.getItem("userId") + "/WatchList/" + movie.id).set(newMovie);
}

export const convertMtoH = (minutes) => {
    let h = 0;
    let m = minutes
    h = parseInt(m/60);
    m -= h*60;
    const time = h + "h" + m + "m";
    return time
}