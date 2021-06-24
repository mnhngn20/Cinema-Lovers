import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'
import Tooltip from '@material-ui/core/Tooltip';

const NavigationItem = ({clicked, link, children, title, exact, logout, mobile}) => {
    return (
        <li className={classes.NavigationItem} onClick={clicked ? clicked : logout}>
            <NavLink 
                // activeClassName={link ? classes.Active : null}
                to = {link ? link : ''}
                exact={exact}>
                    {title 
                        ? mobile ?<div className={classes.NavItem}>
                            <p>{children}</p>
                        </div>
                        :<Tooltip title={title} placement='bottom'>
                            <div className={classes.NavItem}>
                                <p>{children}</p>
                                <p className={classes.NavItemTitle}>{title}</p>
                            </div>
                        </Tooltip>
                        :<div className={classes.NavItem}>
                            <p>{children}</p>
                            <p className={classes.NavItemTitle}>{title}</p>
                        </div>}
            </NavLink>
        </li>
    )
}

export default NavigationItem;