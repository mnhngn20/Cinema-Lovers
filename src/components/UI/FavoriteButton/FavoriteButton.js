import React from 'react';

import classes from './FavoriteButton.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';

const FavoriteButton = ({isAuthenticated, isLoading, isInWatchList, toolTipPlacement, clicked, type}) => {
    const btnType = isInWatchList ? "R" : "A";
    let iconColor = null;
    let spinnerClass = null;
    switch(type){
        case "MovieItemType":
            if(btnType === "R") iconColor = "var(--color3)"; 
                else iconColor = "var(--colorDark)";
            spinnerClass = "MovieItemClass";
            break;
        case "ItemType":
            if(btnType === "R") iconColor = "var(--color3)"; 
                else iconColor = "var(--colorlight)";
            spinnerClass = "ItemClass";
            break;
        case "MovieType":
            if(btnType === "R") iconColor = "var(--color3)";
                else iconColor = "var(--colorlight)" 
            spinnerClass = "MovieClass"
        default: break;
    }
    return (
        isAuthenticated 
            ? isLoading 
                ? <CircularProgress className={[classes.Spinner, classes[spinnerClass]].join(' ')}/>
                : <Tooltip title={isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"} placement={toolTipPlacement}>
                    <FavoriteIcon 
                        style = {{
                            color: iconColor,
                        }}
                        className = {[classes[type], classes.Icon].join(' ')}
                        onClick = {clicked}/>
                </Tooltip>
            : <div></div>
    )
}

export default FavoriteButton;