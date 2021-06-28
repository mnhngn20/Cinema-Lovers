import React from 'react';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import classes from './WebInfo.module.css'

const WebInfo = (props) => {
    const style = {
        width: '40px',
        height: '40px',
    }
    return (
        <div className={classes.Webinfo}>
            <p>cinema-lovers Created by mnhngn20</p>
            <div className={classes.ContacIcons}>
                <a rel="noreferrer" href="https://www.facebook.com/minh.quang.77770/" target="_blank"><FacebookIcon style={style} className={classes.icons}/></a>
                <a rel="noreferrer" href="https://www.instagram.com/mnhngn20/" target="_blank"><InstagramIcon style={style} className={classes.icons}/></a>
                <a rel="noreferrer" href="https://github.com/mnhngn20" target="_blank"><GitHubIcon style={style} className={classes.icons}/></a>
            </div>
        </div>
    )
}

export default WebInfo;