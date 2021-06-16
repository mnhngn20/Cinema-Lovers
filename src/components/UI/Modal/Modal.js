import React from 'react';

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Modal = (props) =>{
    return(
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={[classes.Modal, classes[props.modalType], props.show ? classes.modalShow : classes.modalHide].join(' ')}
                style={{
                    width: props.width,
                    height: props.height
                }}>
                {props.modalType==="Success" 
                ? <CheckCircleOutlineIcon className={classes.SuccessIcon}/>
                : null}
                {props.modalType==="Error" 
                ? <HighlightOffIcon className={classes.ErrorIcon}/>
                : null}
                {props.children}
            </div>
        </div>
    );
}

export default React.memo(
    Modal, 
    (prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children);