import React from 'react';

import logo from '../../../assets/logo.png';
import SearchBar from '../../SearchBar/SearchBar';
import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = props => {
    return (
        <div className={classes.Toolbar}>
            <div className={classes.Logo}>
                <p className={classes.LogoMain}>Cinema</p>
                <p className={classes.LogoSub}>Lovers</p>
            </div>
            <SearchBar />
            <NavigationItems />
        </div>
    )
}

export default Toolbar;