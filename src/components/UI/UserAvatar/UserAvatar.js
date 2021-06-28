import React from 'react';

import classes from './UserAvatar.module.css';
import User from '../../../assets/user.png'
const UserAvatar = ({image}) => {
    return (
        <div>
            <div className={classes.AvatarContainer}><div className={classes.Rouneded}><img src={!image? User :image} className={classes.Avatar} alt="avatar" loading="lazy"/></div></div>
        </div>
    )
}

export default UserAvatar;