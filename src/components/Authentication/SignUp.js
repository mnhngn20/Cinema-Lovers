import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Auth.module.css';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import { checkValidity, updateObject } from '../../shared/ultility';
import ikiru from '../../assets/ikiru.jpg';

const SignUp = ({error, isLoading, onAuth, history, modalClosed}) => {
    const [firstName, setFirstName] = useState({
        value:'', 
        isValid: false, 
        touched: false,
        rules: {
            required: true
        }
    });    
    const [lastName, setLastName] = useState({
        value:'', 
        isValid: false, 
        touched: false,
        rules: {
            required: true
        }
    });
    const [email, setEmail] = useState({
        value:'', 
        isValid: false, 
        touched: false,
        rules: {
            required: true,
            isEmail: true
        }
    });
    const [password, setPassword] = useState({
        value:'', 
        isValid: false, 
        touched: false,
        rules: {
            required: true,
            minLength: 6
        }
    });
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [canSubmitForm, setCanSubmitForm] = useState(false);

    useEffect(()=>{
        if(isSubmitted && error && !isLoading){
            setShowError(true);
        } else if(isSubmitted && !error && !isLoading){
            setShowModal(true)
        }
    }, [isSubmitted, error, isLoading])

    useEffect(() => {
        if(firstName.isValid && lastName.isValid && email.isValid && password.isValid){
            setCanSubmitForm(true);
        } else {
            setCanSubmitForm(false);
        }
    }, [firstName, lastName, email, password]);

    const onChangeHandler = (event, typeInput, setInput) => {
        const newInput = event.target.value;
        const updatedInput = updateObject(typeInput,{
            value: newInput,
            isValid: checkValidity(newInput, typeInput.rules),
            touched: true
        })
        setInput(updatedInput);
    }

    const submitHandler = event => {
        event.preventDefault();
        const userData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        }
        onAuth(email.value, password.value, true, userData);
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
        <div className={classes.AuthContainer}>
            <form className = {classes.Auth} onSubmit={submitHandler}>
                <Modal 
                    show={showModal} 
                    modalType="Success" 
                    modalClosed={closeSignUp}>
                    <p>Signed Up Successful</p>
                </Modal>
                <Modal 
                    show={showError} 
                    modalType="Error" 
                    modalClosed={hideError}>
                    <p>Signed Up Failed</p>
                </Modal>
                <div className = {classes.AuthBox}>
                    <div className={classes.CloseContainer}>
                        <CloseIcon className={classes.Close} onClick={closeSignUp}/>
                    </div>
                    <h2>Create an account</h2>
                    <Input 
                        label = "First Name"
                        elementType ="input"
                        elementConfig = {{type: "text", placeholder: "Example: Nam,..."}}
                        value = {firstName.value}
                        invalid = {!firstName.isValid}
                        shouldValidate
                        touched = {firstName.touched}
                        changed = {event => onChangeHandler(event, firstName, setFirstName)}
                    />
                    <Input 
                        label = "Last Name"
                        elementType ="input"
                        elementConfig = {{type: "text", placeholder: "Example: Nguyen,..."}}
                        value = {lastName.value}
                        invalid = {!lastName.isValid}
                        shouldValidate
                        touched = {lastName.touched}
                        changed = {event => onChangeHandler(event, lastName, setLastName)}
                    />
                    <Input 
                        label = "Email"
                        elementType ="input"
                        elementConfig = {{type: "text", placeholder: "Example: abc@gmail.com,..."}}
                        value = {email.value}
                        invalid = {!email.isValid}
                        shouldValidate
                        touched = {email.touched}
                        changed = {event => onChangeHandler(event, email, setEmail)}
                    />
                    <Input 
                        label = "Password"
                        elementType ="input"
                        elementConfig = {{type: "password", placeholder: "Password"}}
                        value = {password.value}
                        invalid = {!password.isValid}
                        shouldValidate
                        touched = {password.touched}
                        changed = {event => onChangeHandler(event, password, setPassword)}
                    />
                    <Button btnType="Success" disabled={!canSubmitForm}>SIGN UP</Button>
                    <p className={classes.AuthQuote}>Already had an account? <Link to="/signin">Sign In Now</Link></p>
                </div>
            </form>
            <div className={classes.ikiru}>
                    <div className={classes.Welcome}>
                            <p>WELCOME TO</p>
                            <p>CINEMA LOVERS</p>
                    </div>
                    <img className={classes.Wallpaper} src={ikiru} alt="ikiru 1952" />
                </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoading: state.authState.loading,
    error: state.authState.error
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp, userData) => dispatch(actions.auth(email, password, isSignUp, userData))

})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);