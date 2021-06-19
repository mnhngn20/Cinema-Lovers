import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NavigationItems = ({isAuthenticated, clicked, }) => {
    return (
            <div className={classes.NavigationItems}>
                <NavigationItem link="/" exact title="Home">
                        <HomeIcon />
                </NavigationItem>
                {isAuthenticated 
                ? <NavigationItem link='/profile' title="Profile">
                        <AccountCircleIcon />
                </NavigationItem> : null}
                {isAuthenticated 
                    ? <NavigationItem clicked={clicked} title="Log out">
                            <ExitToAppIcon />
                    </NavigationItem> 
                    : <NavigationItem link="/signin">
                        SIGN IN
                    </NavigationItem>}
                {isAuthenticated ? null : <NavigationItem link="/signup">SIGN UP</NavigationItem>}
            </div>
    )
}

const mapState = state => {
    return {
        isAuthenticated: state.authState.token !== null
    }
}

export default connect(mapState, null)(NavigationItems);