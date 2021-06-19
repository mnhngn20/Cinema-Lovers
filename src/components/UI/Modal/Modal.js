import React from 'react';

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Modal = ({show, modalClosed, modalType, children}) =>{
    return(
        <div>
            <Backdrop show={show} clicked={modalClosed}/>
            <div 
                className={[classes.Modal, classes[modalType], show ? classes.modalShow : classes.modalHide].join(' ')}>
                {modalType==="Success" 
                ? <CheckCircleOutlineIcon className={classes.SuccessIcon}/>
                : null}
                {modalType==="Error" 
                ? <HighlightOffIcon className={classes.ErrorIcon}/>
                : null}
                {children}
            </div>
        </div>
    );
}

export default React.memo(
    Modal, 
    (prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children);