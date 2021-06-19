import React from 'react';
import classes from './Button.module.css'

const button = ({btnType, clicked, disabled, children}) => (
    <button
        className = {[classes.Button, classes[btnType]].join(' ')}
        onClick ={clicked}
        disabled={disabled}>{children}</button>
);

export default button;