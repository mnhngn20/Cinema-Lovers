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
        <div>
            <div>
                <SideDrawer show={showSideDrawer} clicked={closeSideDrawer}/>
                <Toolbar clicked={openSideDrawer}/>
            </div>
            <div className={classes.MarginTop}>
                {props.children}
            </div>
            <div>
                {/* <WebInfo /> */}
            </div>
        </div>
    );
}

export default Layout;