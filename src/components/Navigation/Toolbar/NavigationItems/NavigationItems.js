import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NavigationItems = props => {
    return (
            <div className={classes.NavigationItems}>
                
                <NavigationItem link="/" exact>
                    <Tooltip title='Home' placement='bottom'>
                        <HomeIcon />
                    </Tooltip>
                </NavigationItem>
                {props.isAuthenticated 
                ? <NavigationItem link='/profile'>
                    <Tooltip title='Your Profile' placement='bottom'>
                        <AccountCircleIcon />
                    </Tooltip>
                </NavigationItem> : null}
                {props.isAuthenticated 
                    ? <NavigationItem link='/logout'>
                        <Tooltip title='Log out' placement='bottom'>
                            <ExitToAppIcon />
                        </Tooltip>
                    </NavigationItem> 
                    : <NavigationItem link="/signin" >
                        SIGN IN
                    </NavigationItem>}
                {props.isAuthenticated ? null : <NavigationItem link="/signup">SIGN UP</NavigationItem>}
            </div>
        
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authState.token !== null
    }
}

export default connect(mapStateToProps, null)(NavigationItems);