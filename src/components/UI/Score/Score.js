import React from 'react';

import classes from './Score.module.css';
import StarIcon from '@material-ui/icons/Star';

const Score = ({type, voteAverage, voteCount}) => {
    return (
        <div className={classes.Score}>
            <StarIcon style={{color: type === "black" ? "black" : "var(--colorlight)"}} className={classes.StarIcon}/>
            <div className={classes.Vote}>
                <p  className={classes.VoteA}>
                    {voteAverage}<span className={classes.VoteA10} style={{color: type === "black" ? "black" : "rgb(156, 153, 153)"}}>/10</span>
                </p>
                <p style={{color: type === "black" ? "black" : "rgb(156, 153, 153)"}} className={classes.VoteC}>{voteCount} Ratings</p>
            </div>
        </div>
    )
}

export default Score;