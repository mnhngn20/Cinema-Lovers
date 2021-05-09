import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

import Tooltip from '@material-ui/core/Tooltip';

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                activeClassName={classes.Active}
                to = {props.link}
                exact={props.exact}><p>{props.children}</p></NavLink>
        </li>
    )
}

export default NavigationItem;