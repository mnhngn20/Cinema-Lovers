import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './WatchListPage.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';
import Spinner from '../../components/UI/Spinner/Spinner';
import {showTrailer} from '../../shared/ultility';
import Items from './WatchListItems/WatchListItems';

const WatchListPage = props => {
    const [showingTrailer, setShowingTrailer] = useState(false);
    const [trailerPath, setTrailerPath] = useState('');

    const hideModal = () => {
        setShowingTrailer(false);
        setTrailerPath('');
    }

    let watchList = <div className={classes.spinner}><Spinner /></div>
    if(!props.loading && props.watchList){
        watchList = <Items clicked={(movieId) => showTrailer(movieId, setShowingTrailer, setTrailerPath)}
            watchList = {props.watchList} />
    }
    return (
        <div className={classes.WatchListPage}>
            <div>
                <Modal show={showingTrailer}
                    modalType = "Trailer"
                    modalClosed = {hideModal}>
                        <Trailer trailerPath = {trailerPath}/>
                </Modal>
            </div>
            <p className={classes.headline}>Your WatchList</p>
            {watchList}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        watchList: state.watchListState.watchList,
        loading: state.watchListState.loading,
        userData: state.authState.userData
    }
}

export default connect(mapStateToProps, null)(WatchListPage);