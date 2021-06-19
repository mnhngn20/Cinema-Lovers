import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Auth.module.css';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import * as actions from '../../store/actions/index';
import { checkValidity, updateObject } from '../../shared/ultility';

const SignIn = ({error, isLoading, onAuth, history, modalClosed}) => {
    const [email, setEmail] = useState({
        value: '', 
        isValid: false, 
        touched: false,
        rules: {
            required: true,
            isEmail: true
        }
    });
    const [password, setPassword] = useState({
        value: '',
        isValid: false,
        touched: false,
        rules: {
            required: true
        }
    });

    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [canSubmitForm, setCanSubmitForm] = useState('false')

    useEffect(()=>{
        if(isSubmitted && error && !isLoading){
            setShowError(true);
        } else if(isSubmitted && !error){
            setShowModal(true)
        }
    }, [isSubmitted, error, isLoading])

    useEffect(() => {
        if(email.isValid && password.isValid){
            setCanSubmitForm(true);
        } else {
            setCanSubmitForm(false);
        }
    }, [email, password]);

    const onChangeHandler = (event, typeInput, setInput) => {
        const newInput = event.target.value;
        const updatedInput = updateObject(typeInput, {
            value: newInput,
            isValid: checkValidity(newInput, typeInput.rules),
            touched: true
        });
        setInput(updatedInput);
    }

    const submitHandler = event => {
        event.preventDefault();
        onAuth(email.value, password.value);
        setIsSubmitted(true);
    }

    const hideError = () =>{
        setShowError(false);
        setIsSubmitted(false);
    }

    const closeSignUp = () =>{
        history.push('/')
    }

    return (
        <div style={{height:"100vh"}}>
            <Backdrop show={true} clicked={modalClosed}/>
            <form className = {classes.Auth} onSubmit = {submitHandler}>
                <Modal 
                    show={showModal} 
                    modalType="Success">
                    <p>You logged in!</p>
                </Modal>
                <Modal 
                    show={showError} 
                    modalType="Error" 
                    modalClosed={hideError}>
                    <p>Signed In Failed</p>
                </Modal>
                <div className = {classes.AuthBox}>
                    <div className={classes.CloseContainer}>
                        <CloseIcon className={classes.Close} onClick={closeSignUp}/>
                    </div>
                    <Input 
                        label = "Username"
                        elementType = "input"
                        elementConfig = {{type: "text", placeholder: "Example: abc@gmail.com,..."}}
                        value = {email.value}
                        invalid = {!email.isValid}
                        shouldValidate
                        touched = {email.touched}
                        changed = {event => onChangeHandler(event, email, setEmail)}
                    />
                    <Input 
                        label = "Password"
                        elementType = "input"
                        elementConfig = {{type: "password", placeholder: "Password"}}
                        value = {password.value}
                        invalid = {!password.isValid}
                        shouldValidate
                        touched = {password.touched}
                        changed = {event => onChangeHandler(event, password, setPassword)}
                    />
                    <Button btnType="Success" disabled={!canSubmitForm}>SIGN IN</Button>
                    <p className={classes.AuthQuote}>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
                </div>
            </form>
        </div>
        
    )
}

const mapStateToProps = state => ({
    isLoading: state.authState.loading,
    error: state.authState.error
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);