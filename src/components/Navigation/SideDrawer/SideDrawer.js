import React from 'react';

import NavigationItems from '../Toolbar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({show, clicked}) => {
    let SideDrawerClass = [classes.SideDrawer, classes.Close].join(' ');
    if(show){
        SideDrawerClass = [classes.SideDrawer, classes.Open].join(' ');
    }
    return (
        <div>
            <Backdrop show={show} clicked={clicked}/>
            <div>
                <div className={SideDrawerClass}>
                    <div className={classes.SideDrawerTop}>
                        <div className={classes.Logo} onClick={clicked}>
                            <p className={classes.LogoSub}>Lovers</p>
                            <p className={classes.LogoMain}>Cinema</p>
                        </div>
                        <NavigationItems clicked={clicked}/>
                    </div>
                    <div className={classes.SideDrawerBottom}>
                        <p>Created by Mnhngn20</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SideDrawer;