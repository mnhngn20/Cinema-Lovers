import React from 'react';

import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import classes from './WebInfo.module.css'

const WebInfo = props => {
    return (
        <div className={classes.Webinfo}>
            <img src = {facebookIcon} />
            <img src = {instagramIcon} />
            <p>Cinema-Lovers Created by Mnhngn20</p>
        </div>
    )
}

export default WebInfo;