import React from 'react';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import classes from './WebInfo.module.css'

const WebInfo = props => {
    const style = {
        width: '40px',
        height: '40px',
    }
    return (
        <div className={classes.Webinfo}>
            <p>Cinema-Lovers Created by Mnhngn20</p>
            <div className={classes.ContacIcons}>
                <FacebookIcon style={style} className={classes.icons}/>
                <InstagramIcon style={style} className={classes.icons}/>
                <GitHubIcon style={style} className={classes.icons}/>
            </div>
        </div>
    )
}

export default WebInfo;