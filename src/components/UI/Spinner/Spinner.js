import React from 'react'

import classes from './Spinner.module.css'

const spinner = (props) => {
    return (
        <div className={[classes.ldsFacebook, props.colorBlack ? classes.colorBlack : null].join(' ')}><div></div><div></div><div></div></div>
    );
}

export default spinner