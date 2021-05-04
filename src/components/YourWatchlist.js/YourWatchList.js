import React from 'react';

import WatchList from './WatchList/WatchList';
import classes from './YourWatchList.module.css';

const YourWatchList = props => {
    return (
        <div className={classes.YourWatchList}>
            <p>YOUR WATCH LIST</p>
            <WatchList />
        </div>
    )
}

export default YourWatchList;