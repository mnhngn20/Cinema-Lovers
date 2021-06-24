import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Inputs.module.css';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/ultility';
import Button from '../../../components/UI/Button/Button';
import Tooltip from '@material-ui/core/Tooltip';
import * as actions from '../../../store/actions/index';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SwitchButton from '../../../components/UI/SwitchButton/SwitchButton';
import UserAvatar from '../../../components/UI/UserAvatar/UserAvatar';

const Inputs = ({userId , setAvatar, userData, onFetchProfile, onUpdateUserData, isLoading, isInEditMode, switchMode, setEditSuccess}) => {
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
        value: isLoading ? '2000-01-01' : userData.birthDay ? userData.birthDay : "2000-01-01" ,
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
  
    useEffect(() => {
        if(userData){
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
        }
    }, [userData])// eslint-disable-line react-hooks/exhaustive-deps
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
        <div className={classes.container}>
            <div className={[classes.Background, isInEditMode ? classes.Edit : classes.NotEdit].join(' ')}></div>
            <form className={classes.UserProfile} onSubmit={(event) => updateProfile(event, fName.value, lName.value, bDay.value, description.value)}>
                <div className={[classes.Top, isInEditMode  ? classes.Expand : null].join(' ')}>
                    <Tooltip title={isInEditMode ? 'Turn off edit' : 'Click here to Edit Your Profile'} placement='right'>
                        <div className={classes.SwitchButton}><SwitchButton switchMode={switchMode}/></div>
                    </Tooltip>
                    <div className={classes.Profile}>
                        <div className={classes.Avatar}>
                            {isInEditMode ? <div className={classes.SetAvatarContainer}><CameraAltIcon className={classes.SetAvatar} onClick={() => setAvatar(true)}/></div> : null}
                            <UserAvatar userId = {userId} userData={userData} />
                        </div>
                        <div className={classes.Info}>
                            <p className={classes.Name}>{userData ? userData.firstName+" "+userData.lastName : "Name"} </p>
                            <p className={classes.AboutMe}>About Me:</p>
                            <p className={classes.Description}>{userData ? userData.description : ""}</p>
                        </div>
                    </div>
                    <div className={classes.GotoWLContainer}>
                        <Link className={classes.GotoWL} to='/watchlist'>{">>>Go to WatchList"}</Link>
                    </div>
                </div>
                
                    <div className={[classes.Inputs,isInEditMode ? classes.InputsShow : null].join(' ')}>
                        <Input 
                            labelWhite
                            label = "First Name:"
                            elementType = "input"
                            elementConfig = {{type: "text"}}
                            value = {fName.value}
                            invalid = {!fName.isValid}
                            shouldValidate
                            touched = {fName.touched}
                            changed = {event => onChangeHandler(event, fName, setFName)}
                            disabled = {isInEditMode ? false : true}/>
                        <Input 
                            labelWhite
                            label = "Last Name:"
                            elementType = "input"
                            elementConfig = {{type: "text"}}
                            value = {lName.value}
                            invalid = {!lName.isValid}
                            shouldValidate
                            touched = {lName.touched}
                            changed = {event => onChangeHandler(event, lName, setLName)}
                            disabled = {isInEditMode ? false : true}/>
                        <Input 
                            labelWhite
                            label = "Date of Birth:"
                            elementType = "input"
                            elementConfig = {{type: "date"}}
                            value = {bDay.value}
                            invalid = {bDay.isValid}
                            changed = {event => onChangeHandler(event, bDay, setbDay)}
                            disabled = {isInEditMode ? false : true}/>
                        <Input 
                            labelWhite
                            label = "Description:"
                            elementType = "textarea"
                            value = {description.value}
                            invalid = {!description.isValid}
                            touched = {description.touched}
                            changed = {event => onChangeHandler(event, description, setDescription)}
                            disabled = {isInEditMode ? false : true}/>
                    </div> 
                    
                {   
                    isInEditMode
                        ?<Button 
                        btnType="Success" 
                        disabled={!canSubmitForm}>UPDATE</Button>
                        : null
                }
                
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
        isLoading: state.authState.loading,
        error: state.authState.error,
        userData: state.authState.userData,
        userId: state.authState.userId
})

const mapDispatchToProps = dispatch => ({
        onUpdateUserData: (updatedUserData) => dispatch(actions.updateUserProfile(updatedUserData)),
        onFetchProfile: () => dispatch(actions.fetchUserProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);