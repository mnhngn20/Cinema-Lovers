import React, {useState} from 'react';
import {connect} from 'react-redux';

import SearchBar from '../../SearchBar/SearchBar';
import SearchBarForMobile from '../../SearchBar/SearchBarForMobile';
import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import Modal from '../../UI/Modal/Modal';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as actions from '../../../store/actions/index';
 
const Toolbar = props => {
    const [logoutModal, setLogoutModal] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false)
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
            <div className={[classes.Toolbar,showSearchBar ? classes.CenterSearchBar : null].join(' ')}>
                <div className={classes.ToolbarItems}>
                    {showSearchBar ? null : <div className={[classes.Logo, classes.MobileOnly].join(' ')} onClick={props.clicked}>
                        <p className={classes.LogoMain}>Cinema.</p>
                    </div>}
                    <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
                        <p className={classes.LogoMain}>Cinema</p>
                        <p className={classes.LogoSub}>Lovers</p>
                    </div>
                    <div className={classes.SearchBarForDesktop}>
                        <SearchBar />
                    </div>
                    <div className={classes.SearchBarForMobile}>
                        {showSearchBar ? <ArrowBackIosIcon className={classes.Close} onClick={() => setShowSearchBar(!showSearchBar)}/> : null}
                        <SearchBarForMobile show={showSearchBar} setShowSearchBar={setShowSearchBar}/>
                    </div>
                    <div className={classes.DesktopOnly}>
                        <NavigationItems logout={() => setLogoutModal(true)}/>
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

export default connect(null, mapDispatch)(Toolbar);