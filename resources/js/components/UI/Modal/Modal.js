import React from 'react'
import classes from './Modal.module.css'
import Button from "../Button/Button";

const Modal = props => (
    <div id='modal' onClick={(event) => props.clickOutside(event)} className={classes.Modal}>
        <div className={classes.ModalContent}>
            <div>
                {props.children}
            </div>
        </div>
    </div>
);

export default Modal
