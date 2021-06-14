import React from 'react';

import logo from '../../../assets/logo.png';
import SearchBar from '../../SearchBar/SearchBar';
import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = props => {
    return (
        <div className={classes.Toolbar}>
            <div className={[classes.Logo, classes.MobileOnly].join(' ')} onClick={props.clicked}>
                <p className={classes.LogoMain}>Cinema</p>
            </div>
            <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
                <p className={classes.LogoMain}>Cinema</p>
                <p className={classes.LogoSub}>Lovers</p>
            </div>
            <SearchBar />
            <div className={classes.DesktopOnly}>
                <NavigationItems />
            </div>
        </div>
    )
}

export default Toolbar;