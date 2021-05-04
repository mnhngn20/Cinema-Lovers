import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './SignIn.module.css';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import { checkValidity, updateObject } from '../../../shared/ultility';
import Modal from '../../UI/Modal/Modal';

const SignIn = props => {
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

    useEffect(() => {
        if(email.isValid && password.isValid){
            setCanSubmitForm(true);
        }
    }, [email, password]);

    const [canSubmitForm, setCanSubmitForm] = useState('false')

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
        if(!props.error){
            setShowModal(true);
        }
    }

    const redirect = () => {
        props.onAuth(email.value, password.value);
        props.history.push('/');
    }

    return (
        <form className = {classes.SignIn} onSubmit = {submitHandler}>
            <Modal show={showModal} modalClosed={redirect}>
                <p>You logged in!</p>
            </Modal>
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
            <p className={classes.SignUpQuote}>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
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
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);