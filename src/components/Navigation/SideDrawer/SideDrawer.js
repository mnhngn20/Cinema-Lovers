import React, {useState} from 'react';
import {connect} from 'react-redux';

import NavigationItems from '../Toolbar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../../store/actions/index';

const SideDrawer = ({show, clicked, onLogout}) => {
    let SideDrawerClass = [classes.SideDrawer, classes.Close].join(' ');
    if(show){
        SideDrawerClass = [classes.SideDrawer, classes.Open].join(' ');
    }
    const [logoutModal, setLogoutModal] = useState(false);
    const redirect = () => {
        onLogout()
        setLogoutModal(false)
    }
    return (
        <div>
            <Backdrop show={show} clicked={clicked}/>
            <Modal 
                show={logoutModal} 
                modalClosed={redirect}
                modalType="Success" >
                <p>You Logged out.</p>
            </Modal>
            <div>
                <div className={SideDrawerClass}>
                    <div className={classes.SideDrawerTop}>
                        <div className={classes.Logo} onClick={clicked}>
                            <p className={classes.LogoSub}>Lovers</p>
                            <p className={classes.LogoMain}>Cinema</p>
                        </div>
                        <NavigationItems logout={() => setLogoutModal(true)} clicked={clicked}/>
                    </div>
                    <div className={classes.SideDrawerBottom}>
                        <p>Created by Mnhngn20</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatch)(SideDrawer);