import React from 'react';

import NavigationItems from '../Toolbar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';


const SideDrawer = props => {
    let SideDrawerClass = [classes.SideDrawer, classes.Close].join(' ');
    if(props.show){
        SideDrawerClass = [classes.SideDrawer, classes.Open].join(' ');
    }
    return (
        <div>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div>
                <div className={SideDrawerClass}>
                    <div className={classes.Logo} onClick={props.clicked}>
                        <p className={classes.LogoSub}>Lovers</p>
                        <p className={classes.LogoMain}>Cinema</p>
                    </div>
                    <NavigationItems clicked={props.clicked}/>
                </div>
            </div>

        </div>
    )
}

export default SideDrawer;