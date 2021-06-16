import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem} onClick={props.clicked}>
            <NavLink 
                activeClassName={classes.Active}
                to = {props.link}
                exact={props.exact}>
                    <div className={classes.NavItem}>
                        <p>{props.children}</p>
                        <p className={classes.NavItemTitle}>{props.title}</p>
                    </div>
                    
            </NavLink>
        </li>
    )
}

export default NavigationItem;