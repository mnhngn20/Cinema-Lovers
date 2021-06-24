import React from 'react';

import classes from './SwitchButton.module.css'
import Switch from '@material-ui/core/Switch';

const SwitchButton = ({ switchMode}) => {
    return (
        <Switch 
            onClick = {switchMode}
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
                }}
        />
    )
}

export default SwitchButton;