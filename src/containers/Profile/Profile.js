import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Profile.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Inputs from './Inputs/Inputs';
import FilePicker from '../../components/FilePicker/FilePicker';
import { uploadImage } from '../../shared/storage';
import * as actions from '../../store/actions/index';
import { updateObject} from '../../shared/ultility';

const Profile = ({ error, userId, userData, onUpdateUserData, onFetchProfile }) => {
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
    const upload = (img, userId, userData) => {
        uploadImage(img, userId);
        let updatedUserData = updateObject(userData,{
            avatar: img
        })
        onUpdateUserData(updatedUserData);
        hideModal();
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
                    <FilePicker close={hideModal} uploadImage={(img) => upload(img, userId, userData)}/>
            </Modal>
            <Inputs switchMode={switchMode} isInEditMode={isInEditMode} setEditSuccess={setEditSuccess} setAvatar={setAvatar}/>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoading: state.authState.loading,
    error: state.authState.error,
    userId: state.authState.userId,
    userData: state.authState.userData
})

const mapDispatchToProps = dispatch => ({
    onUpdateUserData: (updatedUserData) => dispatch(actions.updateUserProfile(updatedUserData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);