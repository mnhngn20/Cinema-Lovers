import React from 'react';

import classes from './Input.module.css';

const Input = ({invalid, shouldValidate, touched, elementType, elementConfig, value, changed, disabled, label}) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;

    if(invalid && shouldValidate && touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }
    switch (elementType){
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...elementConfig} 
                value={value}
                onChange={changed}
                disabled = {disabled}
                />
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...elementConfig} 
                value={value}
                onChange={changed}/>
            break;
        case ('select'):
            inputElement = <select 
                className={inputClasses.join(' ')}
                value={value}
                onChange={changed}>
                {elementConfig.options.map(option =>{
                    return <option 
                        key={option.value} 
                        value={option.value}>{option.displayValue}</option>
                })}
                </select>
                break;
        default:
            inputElement = <input
            onChange={changed} 
                className={inputClasses.join(' ')} 
                {...elementConfig} 
                value={value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default Input;