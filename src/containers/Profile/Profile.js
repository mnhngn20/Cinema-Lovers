import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.css';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/ultility';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';

const Profile = ({ userData, error, onFetchProfile, onUpdateUserData, isLoading }) => {
    const [editSuccess, setEditSuccess] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [canSubmitForm, setCanSubmitForm] = useState(false);
    const [showingError, setShowingError] = useState(false);
    const [fName, setFName] = useState({
        value: isLoading ? 'Loading...' : userData.firstName, 
        isValid: true, 
        touched: false,
        rules: {
            required: true,
            minLength: 0
        }
    });
    const [lName, setLName] = useState({
        value: isLoading ? 'Loading...' : userData.lastName, 
        isValid: true, 
        touched: false,
        rules: {
            required: true,
            minLength: 0
        }
    });
    useEffect(()=>{
        if(!userData) {onFetchProfile();}
    })
    const updateInputs = useCallback((userData) => {
        setFName(updateObject(fName, {
            value: userData.firstName
        }));
        setLName(updateObject(lName, {
            value: userData.lastName
        }));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(userData){
            updateInputs(userData);
        }
    }, [userData, updateInputs])

    useEffect(()=>{
        if(error){
            
            setShowingError(true)
        }
    }, [error])

    useEffect(() => {
        if(fName.isValid && lName.isValid){
            setCanSubmitForm(true);
        } else {
            setCanSubmitForm(false);
        }
    }, [fName, lName]); 

    const onChangeHandler = (event, typeInput, setInput) => {
        const newInput = event.target.value;
        const updatedInput = updateObject(typeInput,{
            value: newInput,
            isValid: checkValidity(newInput, typeInput.rules),
            touched: true
        })
        setInput(updatedInput);
    }

    const hideModal = () =>{
        setShowingError(false);
        setEditSuccess(false);
    }

    const updateProfile = (event, firstName, lastName) => {
        event.preventDefault();
        let updatedUserData = updateObject(userData, {
            firstName: firstName,
            lastName: lastName
        })
        setFName(updateObject(fName, {
            value: userData.firstName
        }));
        setLName(updateObject(lName, {
            value: userData.lastName
        }));
        onUpdateUserData(updatedUserData);
        setEditSuccess(true);
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
            <form className={classes.UserProfile} onSubmit={(event) => updateProfile(event, fName.value, lName.value)}>
                <Tooltip title={isInEditMode ? 'Turn off edit' : 'Click here to Edit Your Profile'} placement='top'>
                    <AccountCircleIcon 
                        className={
                            isInEditMode 
                            ? [classes.EditButton, classes.EditButtonActive].join(' ')
                            : [classes.EditButton, classes.EditButtonInactive].join(' ')
                        } 
                        onClick={switchMode}/>
                </Tooltip>
                
                <Input 
                    label = "First Name:"
                    elementType = "input"
                    elementConfig = {{type: "text"}}
                    value = {fName.value}
                    invalid = {!fName.isValid}
                    shouldValidate
                    touched = {fName.touched}
                    changed = {event => onChangeHandler(event, fName, setFName)}
                    disabled = {isInEditMode ? false : true}
                />
                <Input 
                    label = "Last Name:"
                    elementType = "input"
                    elementConfig = {{type: "text"}}
                    value = {lName.value}
                    invalid = {!lName.isValid}
                    shouldValidate
                    touched = {lName.touched}
                    changed = {event => onChangeHandler(event, lName, setLName)}
                    disabled = {isInEditMode ? false : true}
                />
                {   isInEditMode
                    ?<Button 
                    btnType="Success" 
                    disabled={!canSubmitForm}>UPDATE</Button>
                    : null
                }
                <div className={classes.GotoWLContainer}>
                    <a className={classes.GotoWL} href='/watchlist'>Go to your WatchList</a>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.authState.loading,
        error: state.authState.error,
        userData: state.authState.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUserData: (updatedUserData) => dispatch(actions.updateUserProfile(updatedUserData)),
        onFetchProfile: () => dispatch(actions.fetchUserProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);