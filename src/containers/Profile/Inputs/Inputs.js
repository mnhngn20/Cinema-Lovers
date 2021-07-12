import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Inputs.module.css';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/ultility';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SwitchButton from '../../../components/UI/SwitchButton/SwitchButton';
import UserAvatar from '../../../components/UI/UserAvatar/UserAvatar';
import Favorites from '../../../components/ListMovie/ListMovie';
import LikedMovie from '../LikedMovies/LikedMovie';

const Inputs = ({watchlist,img , setAvatar, userData, onFetchProfile, onUpdateUserData, isLoading, isInEditMode, switchMode, setEditSuccess}) => {
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
        value: isLoading ? '' : userData.birthDay ? userData.birthDay : "" ,
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
    const updateProfile = (event, firstName, lastName, birthDay, des) => {
        event.preventDefault();
        let updatedUserData = updateObject(userData, {
            firstName: firstName,
            lastName: lastName,
            birthDay: birthDay,
            description: des
        })
        setFName(updateObject(fName, {
            value: firstName
        }));
        setLName(updateObject(lName, {
            value: lastName
        }));
        if(birthDay){
            setbDay(updateObject(bDay, {
                value: birthDay
            }))
        }
        setDescription(updateObject(description, {
            value: des
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
            <form className={[classes.UserProfile, isInEditMode ? classes.InputsShow : classes.InfoShow].join(' ')} onSubmit={(event) => updateProfile(event, fName.value, lName.value, bDay.value ? bDay.value : "", description.value ?description.value : "")}>
                        <div className={classes.Top}>
                            {watchlist ?<div className={classes.Stats}>
                                <LikedMovie watchList={watchlist} type="Liked" />
                                <LikedMovie watchList={watchlist} type="Watched" /> 
                            </div> : null}
                            <div className={classes.SwitchButton}>
                                <SwitchButton switchMode={switchMode}/>
                            </div>
                        </div>
                    <div className={classes.Profile}>
                        <div className={classes.Avatar}>
                            {isInEditMode ? <div className={classes.SetAvatarContainer}><CameraAltIcon className={classes.SetAvatar} onClick={() => setAvatar(true)}/></div> : null}
                            <UserAvatar image={img}/>
                        </div>
                            {isInEditMode ? <div className={classes.Inputs}>
                                <h1>Edit your Profile</h1>
                                <Input
                                    labelBlue 
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
                                    labelBlue 
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
                                    labelBlue
                                    label = "Date of Birth:"
                                    elementType = "input"
                                    elementConfig = {{type: "date"}}
                                    value = {bDay.value}
                                    invalid = {bDay.isValid}
                                    changed = {event => onChangeHandler(event, bDay, setbDay)}
                                    disabled = {isInEditMode ? false : true}/>
                                <Input 
                                    labelBlue
                                    label = "Description:"
                                    elementType = "textarea"
                                    value = {description.value}
                                    invalid = {!description.isValid}
                                    touched = {description.touched}
                                    changed = {event => onChangeHandler(event, description, setDescription)}
                                    disabled = {isInEditMode ? false : true}/>
                                <Button 
                                    labelBlue
                                    btnType="Success" 
                                    disabled={!canSubmitForm}>UPDATE</Button>
                            </div>
                            : <div className={classes.Info}>
                                <p className={classes.Name}>{userData ? userData.firstName+" "+userData.lastName : "Name"}</p>
                                <p className={classes.Description}>{userData ? userData.description : ""}</p>
                            </div>}
                    </div>
                    <div className={classes.GotoWLContainer}>
                        <Link className={classes.ChangePassword} to='/change-password'>{"Change Password"}</Link>
                        <Link className={classes.GotoWL} to='/watchlist'>{"Go to WatchList"}</Link>
                    </div>
            </form>
            {watchlist.length !== 0 ? <div className={classes.Favorites}>
                <Favorites quantity={10} list={watchlist} title="Favorites"/>
            </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
        isLoading: state.authState.loading,
        error: state.authState.error,
        userData: state.authState.userData,
        userId: state.authState.userId,
        watchlist: state.watchListState.watchList
})

const mapDispatchToProps = dispatch => ({
        onUpdateUserData: (updatedUserData) => dispatch(actions.updateUserProfile(updatedUserData)),
        onFetchProfile: () => dispatch(actions.fetchUserProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);