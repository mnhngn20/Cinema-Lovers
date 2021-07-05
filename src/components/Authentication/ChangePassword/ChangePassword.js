import React, {useState, useEffect} from 'react';

import classes from './ChangePassword.module.css'
import { connect } from 'react-redux';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import { updateObject, checkValidity } from '../../../shared/ultility';
import Button from '../../UI/Button/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as actions from '../../../store/actions/index';

const ChangePassword = ({history, error, onChangePass}) => {
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState("");
    const [err, setErr] = useState('');
    const [canSubmitForm, setCanSubmitForm] = useState('false')
    const [confirmPassword, setConfirmPassword] = useState({
        value: '', 
        isValid: false, 
        touched: false,
        rules: {
            minLength: 6
        }
    });
    const [password, setPassword] = useState({
        value: '',
        isValid: false,
        touched: false,
        rules: {
            minLength: 6
        }
    });

    useEffect(()=>{
        if(error){
            setErr(error.message);
            setShowError(true);
        }
    }, [error])

    useEffect(() => {
        if(password.isValid && confirmPassword.isValid){
            setCanSubmitForm(true);
        } else {
            setCanSubmitForm(false);
        }
    }, [password, confirmPassword]);

    const submitHandler = event => {
        event.preventDefault();
        if(password.value !== confirmPassword.value){
            setErr("Password doesn't match")
            setShowError(true);
        } else {
            onChangePass(password.value);
            setShowModal(true);
        }
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

    const hideModal = () =>{
        setShowError(false);
        setShowModal(false)
    }

    return (
        <form className={classes.ChangePassword} onSubmit={submitHandler}>
            <ArrowBackIosIcon className={classes.BackIcon} onClick={()=>{history.goBack()}}/>
            <Modal 
                show={showModal} 
                modalType="Success" 
                modalClosed={hideModal}>
                    <p>Password changed!</p>
            </Modal>
            <Modal
                show={showError} 
                modalType="Error" 
                modalClosed={hideModal}>
                    <p>{err}</p>
            </Modal>
            <h1>Change your password</h1>
            <Input 
                label = "New Password:"
                elementType ="input"
                elementConfig = {{type: "password", placeholder: "New password"}}
                value = {password.value}
                invalid = {!password.isValid}
                shouldValidate
                smallerWidth
                touched = {password.touched}
                changed = {event => onChangeHandler(event, password, setPassword)}
            />
            <Input 
                label = "Confirm Password:"
                elementType ="input"
                elementConfig = {{type: "password", placeholder: "Confirm Password"}}
                value = {confirmPassword.value}
                invalid = {!confirmPassword.isValid}
                shouldValidate
                smallerWidth
                touched = {confirmPassword.touched}
                changed = {event => onChangeHandler(event, confirmPassword, setConfirmPassword)}
            />
            <Button btnType="Success" disabled={!canSubmitForm}>Change</Button>
        </form>
    )
}

const mapStateToProps = state => ({
    isLoading: state.authState.loading,
    error: state.authState.error,
    userData: state.authState.userData
})

const mapDispatchToProps = dispatch => ({
    onChangePass: (password) => dispatch(actions.changePassword(password))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);