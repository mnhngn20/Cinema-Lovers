import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import Modal from '../../UI/Modal/Modal';

const Logout = props => {
    const [showModal, setShowModal] = useState(true);
    // const { onLogout } = props;

    // useEffect(()=> {
    //     setShowModal(true);
    //     onLogout();
    // }, [onLogout]);

    const redirect = () => {
        props.onLogout()
        props.history.push('/')
    }

    return (
        <div>
            {showModal
            ?<Modal show={showModal} modalClosed={redirect}><p>You Logged out.</p></Modal>
            :null}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null , mapDispatchToProps)(Logout);