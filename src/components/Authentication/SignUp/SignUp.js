import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './SignUp.module.css';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import { checkValidity, updateObject } from '../../../shared/ultility';
import Modal from '../../../components/UI/Modal/Modal';

const SignUp = props => {
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

    useEffect(() => {
        if(firstName.isValid && lastName.isValid && email.isValid && password.isValid){
            setCanSubmitForm(true);
        }
    }, [firstName, lastName, email, password]);

    const [canSubmitForm, setCanSubmitForm] = useState(false);

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
        props.onAuth(email.value, password.value, true, userData);
        if(!props.error){
            setShowModal(true);
        }
    }

    const redirect = () => {
        props.history.push('/')
    }
    return (
            <form className = {classes.SignIn} onSubmit={submitHandler}>
                <Modal show={showModal} modalClosed={redirect}>
                    <p>Signed Up Successful</p>
                </Modal>
                <label>SIGN UP PAGE</label>
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
                <p className={classes.SignUpQuote}>Already had an account? <Link to="/signin">Sign In Now</Link></p>
            </form>
    )
}

const mapStateToProps = state => {
    return {
        isloading: state.authState.loading,
        error: state.authState.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp, userData) => dispatch(actions.auth(email, password, isSignUp, userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);