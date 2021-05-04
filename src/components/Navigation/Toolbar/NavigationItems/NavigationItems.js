import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
    return (
        <div>
            <div className={classes.NavigationItems}>
                <NavigationItem link="/" exact>
                    HOME
                </NavigationItem>
                {props.isAuthenticated ? <NavigationItem link='/profile'>PROFILE</NavigationItem> : null}
                {props.isAuthenticated 
                    ? <NavigationItem link='/logout'>
                        LOG OUT
                    </NavigationItem> 
                    : <NavigationItem link="/signin" >
                        SIGN IN
                    </NavigationItem>}
            </div>
            {!props.isAuthenticated ? <p className={classes.SignUpQuote}>Don't have an account yet? <Link to="/signup">Sign Up</Link></p> : null}
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authState.token !== null
    }
}

export default connect(mapStateToProps, null)(NavigationItems);