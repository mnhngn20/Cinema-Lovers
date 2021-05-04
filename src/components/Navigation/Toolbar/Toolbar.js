import React from 'react';

import logo from '../../../assets/logo.png';
import SearchBar from '../../SearchBar/SearchBar';
import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = props => {
    return (
        <div className={classes.Toolbar}>
            <div className={classes.LogoContainer}>
                <img className={classes.Logo} src= {logo} />
            </div>
            <form>
                <SearchBar />
            </form>
            <nav><NavigationItems /></nav>
        </div>
    )
}

export default Toolbar;