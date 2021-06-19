import React, {useState} from 'react';
import {connect} from 'react-redux';

import SearchBar from '../../SearchBar/SearchBar';
import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
 
const Toolbar = props => {
    const [logoutModal, setLogoutModal] = useState(false);
    const redirect = () => {
        props.onLogout()
        setLogoutModal(false)
    }

    return (
        <div>
            <Modal 
                show={logoutModal} 
                modalClosed={redirect}
                modalType="Success" >
                <p>You Logged out.</p>
            </Modal>
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
                    <NavigationItems logout={() => setLogoutModal(true)}/>
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

export default connect(null, mapDispatch)(Toolbar);