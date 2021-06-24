import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';

const NavigationItems = ({isAuthenticated, clicked, logout}) => {
    return (
            <div className={classes.NavigationItems}>
                <NavigationItem clicked={clicked} link="/" exact title="Home" mobile={true}>
                        {isAuthenticated ? <HomeIcon /> : "HOME"}
                </NavigationItem>
                {isAuthenticated 
                ? <NavigationItem clicked={clicked} link='/profile' title="Profile">
                        <AccountCircleIcon />
                </NavigationItem> : null}
                {isAuthenticated 
                ? <NavigationItem clicked={clicked} link='/watchlist' title="Your Watchlist">
                        <ListIcon />
                </NavigationItem> : null}
                {isAuthenticated 
                    ? <NavigationItem logout={logout} title="Log out">
                            <ExitToAppIcon />
                    </NavigationItem> 
                    : <NavigationItem clicked={clicked} link="/signin">
                        SIGN IN
                    </NavigationItem>}
                {isAuthenticated ? null : <NavigationItem clicked={clicked} link="/signup">SIGN UP</NavigationItem>}
            </div>
    )
}

const mapState = state => {
    return {
        isAuthenticated: state.authState.isAuth
    }
}

export default connect(mapState, null)(NavigationItems);