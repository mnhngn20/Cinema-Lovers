import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'
const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                activeClassName={classes.Active}
                to = {props.link}
                exact={props.exact}>{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem;