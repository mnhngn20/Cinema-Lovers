import React from 'react';

import classes from './LikedMovie.module.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';

const LikedMovie = ({watchList, type}) => {
    let icon = null
    let count = 0;
    if(type==="Liked"){
        icon = <FavoriteIcon className={classes.icon} />
        count = watchList.length;
    } else if(type==="Watched"){
        for(let key in watchList){
            if(watchList[key].watched === 'yes'){
                count++;
            }
        }
        icon = <VisibilityIcon className={classes.icon} />
    }
    return(
        <div className = {classes.LikedMovie}>
            <div className={classes.Top}>
                <p className={classes.Count}>{count}</p>
                {icon}
            </div>
            <p className={classes.Type}>{type}</p>
        </div>
    )
}

export default LikedMovie;