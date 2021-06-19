import React, { useState } from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import WebInfo from '../../components/WebInfo/WebInfo';
import classes from './Layout.module.css';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const openSideDrawer = () => {
        setShowSideDrawer(true);
    }

    const closeSideDrawer = () => {
        setShowSideDrawer(false)
    }

    return (
        <div className={classes.Layout}>
            <div className={classes.Top}>
                <SideDrawer show={showSideDrawer} clicked={closeSideDrawer}/>
                <Toolbar clicked={openSideDrawer}/>
            </div>
            <div className={classes.Body}>
                {props.children}
            </div>
            <div className={classes.Bottom}>
                <WebInfo />
            </div>
        </div>
    );
}

export default Layout;