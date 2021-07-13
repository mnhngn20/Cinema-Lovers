import React from 'react';

import classes from './FavoriteButton.module.css'
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';

const FavoriteButton = ({isAuthenticated, isInWatchList, toolTipPlacement, clicked, type}) => {
    console.log(isAuthenticated);
    const btnType = isInWatchList ? "R" : "A";
    let iconColor = null;
    switch(type){
        case "MovieItemType":
            if(btnType === "R") iconColor = "var(--color3)"; 
                else iconColor = "var(--colorDark)";
            break;
        case "ItemType":
            if(btnType === "R") iconColor = "var(--color3)"; 
                else iconColor = "var(--colorlight)";
            break;
        case "MovieType":
            if(btnType === "R") iconColor = "var(--color3)";
                else iconColor = "var(--colorlight)" 
            break;
        default: break;
    }
    return (
        isAuthenticated 
            ? <Tooltip title={isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"} placement={toolTipPlacement}>
                    <FavoriteIcon 
                        style = {{
                            color: iconColor,
                        }}
                        className = {[classes[type], classes.Icon].join(' ')}
                        onClick = {clicked}/>
            </Tooltip>
            : null
    )
}

export default FavoriteButton;