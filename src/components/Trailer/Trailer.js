import React, { useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './Trailer.module.css'
const Trailer = props => {  
    const { trailerPath } = props;
    let trailer = <CircularProgress className={classes.Spinner}/>
    if(trailerPath !== ''){
        trailer = ( 
            <iframe width="100%" height="100%" src= {"https://www.youtube.com/embed/"+ props.trailerPath}>
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