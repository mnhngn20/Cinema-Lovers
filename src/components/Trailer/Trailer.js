import React, { useEffect } from 'react';
import Spinner from '../UI/Spinner/Spinner';

import classes from './Trailer.module.css'
const Trailer = props => {  
    const { trailerPath } = props;
    let trailer = <Spinner />;
    if(trailerPath !== ''){
        trailer = ( 
            <iframe width="600" height="450" src= {"https://www.youtube.com/embed/"+ props.trailerPath}>
            </iframe>
        );
    }
    return (
        <div className = {classes.Trailer}>
            {trailer}
        </div>
    )
}

export default Trailer;