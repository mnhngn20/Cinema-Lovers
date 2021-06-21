import React from 'react'

import classes from './FilePicker.module.css';

const FilePicker = ({}) => {
    const onChangeHandler = (event) => {
        console.log(event.target.file)
    }
    return (
        <div className={classes.FilePicker}>
            <input type="file" onChange={event => onChangeHandler(event)} />
        </div>
    )
}

export default FilePicker;