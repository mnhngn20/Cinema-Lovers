import React, {useState, useEffect} from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { downloadImage } from '../../../shared/storage';
import blank from '../../../assets/blank.png';
import classes from './UserAvatar.module.css';

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
            {!userAvatar ?
                <AccountCircleIcon 
                    className={classes.PlaceHolderAvatar}/>
            : <div className={classes.AvatarContainer}><div className={classes.Rouneded}><img src={img} className={classes.Avatar} alt="avatar" /></div></div>
            }
        </div>
    )
}

export default UserAvatar;