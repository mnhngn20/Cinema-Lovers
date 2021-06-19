import React from 'react';

import classes from './Score.module.css';
import StarIcon from '@material-ui/icons/Star';

const Score = ({voteAverage, voteCount}) => {
    return (
        <div className={classes.Score}>
            <StarIcon className={classes.StarIcon}/>
            <div className={classes.Vote}>
                <p className={classes.VoteA}>
                    {voteAverage}<span className={classes.VoteA10}>/10</span>
                </p>
                <p className={classes.VoteC}>{voteCount} Ratings</p>
            </div>
        </div>
    )
}

export default Score;