import React, { useEffect } from 'react';

import Spinner from '../UI/Spinner/Spinner';

import classes from './Trailer.module.css'

const Trailer = ({trailerPath}) => {  
    let trailer = <div className={classes.Spinner}><Spinner colorBlack/></div>
    if(trailerPath){
        if(trailerPath === 'err'){
            trailer = <div>NO TRAILER AVAILABLE</div>
        } else {
            trailer = ( 
                <iframe width="100%" height="100%" src= {"https://www.youtube.com/embed/"+ trailerPath}>
                </iframe>
            );
        }
    }
    return (
        <div className = {classes.Trailer}>
            {trailer}
        </div>
    )
}

export default Trailer;