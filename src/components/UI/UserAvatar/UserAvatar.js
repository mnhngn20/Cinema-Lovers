import React, {useState, useEffect} from 'react';

import { downloadImage } from '../../../shared/storage';
import blank from '../../../assets/blank.png';
import classes from './UserAvatar.module.css';
import User from '../../../assets/user.png'
const UserAvatar = ({userData, userId}) => {
    const [userAvatar, setUserAvatar] = useState(false);
    const [img, setImg] = useState(blank)
    useEffect(()=>{
        if(userData){
            if(userData.avatar){
                setUserAvatar(userData.avatar);
                downloadImage(userId, setImg);
            }
        }
    }, [userData, userId])
    return (
        <div>
            <div className={classes.AvatarContainer}><div className={classes.Rouneded}><img src={!userAvatar? User :img} className={classes.Avatar} alt="avatar" /></div></div>
        </div>
    )
}

export default UserAvatar;