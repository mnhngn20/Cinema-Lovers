import React from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

const Profile = props => {
    let userProfile = <Spinner />
    if(!props.isLoading && props.userData){
        userProfile = (
            <div>
                <p>FIRST NAME: {props.userData.firstName}</p>
                <p>LAST NAME: {props.userData.lastName}</p>
                <a href='/watchlist'>Go to watchlist</a>
            </div>
        )
    }
    return (
        <div className = {classes.Profile}>
            {userProfile}
        </div>
    )
}

const mapDispatchToProps = state => {
    return {
        isLoading: state.authState.loading,
        error: state.authState.error,
        userData: state.authState.userData
    }
}

export default connect(mapDispatchToProps, null)(Profile);