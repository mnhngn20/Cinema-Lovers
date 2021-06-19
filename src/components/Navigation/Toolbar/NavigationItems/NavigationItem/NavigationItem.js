import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'
import Tooltip from '@material-ui/core/Tooltip';

const NavigationItem = ({clicked, link, children, title, exact}) => {
    return (
        <li className={classes.NavigationItem} onClick={clicked}>
            <NavLink 
                activeClassName={link ? classes.Active : null}
                to = {link ? link : ''}
                exact={exact}>
                    <Tooltip title={title} placement='bottom'>
                        <div className={classes.NavItem}>
                            <p>{children}</p>
                            <p className={classes.NavItemTitle}>{title}</p>
                        </div>
                    </Tooltip>
            </NavLink>
        </li>
    )
}

export default NavigationItem;