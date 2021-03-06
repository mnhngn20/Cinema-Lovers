import React from 'react';

import classes from './Input.module.css';
                                
const Input = ({smallerWidth, labelBlue, invalid, shouldValidate, touched, elementType, elementConfig, value, changed, disabled, label}) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    if(invalid && shouldValidate && touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }
    if(disabled){
        inputClasses.push(classes.Disabled)
    }
    if(smallerWidth){
        inputClasses.push(classes.smallerWidth)
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
            inputClasses.push(classes.Textarea);
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...elementConfig} 
                value={value}
                onChange={changed}
                disabled = {disabled}/>
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
            <label className={[classes.Label, labelBlue ? classes.labelWhite : null].join(' ')}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default Input;