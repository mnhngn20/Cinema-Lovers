import React, { useState, useEffect } from 'react';

import classes from './Profile.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Inputs from './Inputs/Inputs';
import FilePicker from '../../components/FilePicker/FilePicker';

const Profile = ({ error }) => {
    const [editSuccess, setEditSuccess] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [showingError, setShowingError] = useState(false);
    const [avatar, setAvatar] = useState(false);

    useEffect(()=>{
        if(error){
            setShowingError(true)
        }
    }, [error])

    const hideModal = () =>{
        setShowingError(false);
        setEditSuccess(false);
        setAvatar(false);
    }
    
    const switchMode = () =>{
        setIsInEditMode(!isInEditMode);
    }

    return (
        <div className = {classes.Profile}>
            <Modal show={showingError}
                modalClosed={hideModal}
                modalType = "Error">
                {error ? error.message : null}
            </Modal>
            <Modal show={editSuccess}
                modalClosed={hideModal}
                modalType = "Success">
                    <p>Changed!</p>
            </Modal>
            <Modal show={avatar}
                modalClosed={hideModal}
                modalType = "Avatar">
                    <FilePicker clicked={hideModal}/>
            </Modal>
            <Inputs switchMode={switchMode} isInEditMode={isInEditMode} setEditSuccess={setEditSuccess} setAvatar={setAvatar}/>
        </div>
    )
}



export default Profile;