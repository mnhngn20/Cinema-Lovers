import React, {useState, useEffect, useCallback} from 'react'
import {connect} from 'react-redux';

import classes from './Inputs.module.css';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/ultility';
import Button from '../../../components/UI/Button/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as actions from '../../../store/actions/index';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const Inputs = ({setAvatar, userData, onFetchProfile, onUpdateUserData, isLoading, isInEditMode, switchMode, setEditSuccess}) => {
    const [canSubmitForm, setCanSubmitForm] = useState(false);
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
    const [bDay, setbDay] = useState({
        value: isLoading ? '2000-01-01' : userData.birthDay ? userData.birthDay : "" ,
        isValid: true,
        touched: false,
        rules: {
            required: false
        }
    })
    const [description, setDescription] = useState({
        value: isLoading ? '...' : userData.description ? userData.description : '...',
        isValid: true,
        touched: false,
        rules: {
            required: false
        }
    })
    useEffect(()=>{
        if(!userData) onFetchProfile();
    })
    
    const updateInputs = useCallback((userData) => {
        setFName(updateObject(fName, {
            value: userData.firstName
        }));
        setLName(updateObject(lName, {
            value: userData.lastName
        }));
        setbDay(updateObject(bDay, {
            value: userData.birthDay
        }))
        setDescription(updateObject(description, {
            value: userData.description
        }))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(userData){
            updateInputs(userData);
        }
    }, [userData, updateInputs])
    useEffect(() => {
        if(fName.isValid && lName.isValid){
            setCanSubmitForm(true);
        } else {
            setCanSubmitForm(false);
        }
    }, [fName, lName]); 
    const updateProfile = (event, firstName, lastName, birthDay, description) => {
        event.preventDefault();
        let updatedUserData = updateObject(userData, {
            firstName: firstName,
            lastName: lastName,
            birthDay: birthDay,
            description: description
        })
        setFName(updateObject(fName, {
            value: userData.firstName
        }));
        setLName(updateObject(lName, {
            value: userData.lastName
        }));
        setbDay(updateObject(bDay, {
            value: userData.birthDay
        }))
        setDescription(updateObject(description, {
            value: userData.description
        }))
        onUpdateUserData(updatedUserData);
        setEditSuccess(true);
    }

    const onChangeHandler = (event, typeInput, setInput) => {
        const newInput = event.target.value;
        const updatedInput = updateObject(typeInput,{
            value: newInput,
            isValid: checkValidity(newInput, typeInput.rules),
            touched: true
        })
        setInput(updatedInput);
    }
    return (
        <form className={classes.UserProfile} onSubmit={(event) => updateProfile(event, fName.value, lName.value, bDay.value, description.value)}>
            <div className={classes.SetAvatarContainer}><CameraAltIcon className={classes.SetAvatar} onClick={() => setAvatar(true)}/></div>
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
            <Input 
                label = "Date of Birth:"
                elementType = "input"
                elementConfig = {{type: "date"}}
                value = {bDay.value}
                invalid = {bDay.isValid}
                changed = {event => onChangeHandler(event, bDay, setbDay)}
                disabled = {isInEditMode ? false : true}
            />
            <Input 
                label = "Description:"
                elementType = "textarea"
                value = {description.value}
                invalid = {!description.isValid}
                touched = {description.touched}
                changed = {event => onChangeHandler(event, description, setDescription)}
                disabled = {isInEditMode ? false : true}
            />
            {   
                isInEditMode
                    ?<Button 
                    btnType="Success" 
                    disabled={!canSubmitForm}>UPDATE</Button>
                    : null
            }
            <div className={classes.GotoWLContainer}>
                <a className={classes.GotoWL} href='/watchlist'>{">>>Go to WatchList"}</a>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
        isLoading: state.authState.loading,
        error: state.authState.error,
        userData: state.authState.userData
})

const mapDispatchToProps = dispatch => ({
        onUpdateUserData: (updatedUserData) => dispatch(actions.updateUserProfile(updatedUserData)),
        onFetchProfile: () => dispatch(actions.fetchUserProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);