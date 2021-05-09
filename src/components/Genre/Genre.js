import React, {useState, useEffect} from 'react';

import classes from './Genre.module.css'


const Genre = props => {
    const [genreType, setGenreType] = useState();
    const color = null;
    useEffect(()=>{
        console.log("hi")
        
    }, [])
    


    return (
        <div className={classes.Genre}>
            <p>{genreType}</p>
        </div>
    )
}

export default Genre;