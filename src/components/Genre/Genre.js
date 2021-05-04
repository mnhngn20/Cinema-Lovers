import React, {useState, useEffect} from 'react';

import classes from './Genre.module.css'


const Genre = props => {
    const [genreType, setGenreType] = useState();
    const color = null;
    useEffect(()=>{
        console.log("hi")
        switch (props.type){
            case 28:
                setGenreType("Action");
                break;
            case 12:
                setGenreType("Adventure");
                break;
            case 16:
                setGenreType("Animation");
                break;
            case 35:
                setGenreType("Comedy");
                break;
            case 80:
                setGenreType("Crime");
                break;
            case 99:
                setGenreType("Documentary");
                break;
            case 18:
                setGenreType("Drama");
                break;
            case 10751:
                setGenreType("Family");
                break;
            case 14:
                setGenreType("Fantasy");
                break;
            case 36:
                setGenreType("History");
                break;
            case 27:
                setGenreType("Horror");
                break;
            case 10402:
                setGenreType("Music");
                break;            
            case 9648:
                setGenreType("Mystery");
                break;            
            case 10749:
                setGenreType("Romance");
                break;            
            case 878:
                setGenreType("Science Fiction");
                break;
            case 10770:
                setGenreType("TV Movie");
                break;
            case 53:
                setGenreType("Thriller");
                break;
            case 10752:
                setGenreType("War");
                break;
            case 37:
                setGenreType("Western");
                break;  
            default:
                setGenreType("Undefined");
                break;  
        }
    }, [])
    


    return (
        <div className={classes.Genre}>
            <p>{genreType}</p>
        </div>
    )
}

export default Genre;