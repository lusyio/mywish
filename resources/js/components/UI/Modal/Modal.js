import React from 'react'
import classes from './Modal.module.css'
import Button from "../Button/Button";
import {Animated} from "react-animated-css";

const Modal = props => {
    return (
        <div id='modal' onClick={(event) => props.clickOutside(event)} className={classes.Modal}>
            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                <div className={classes.ModalContent}>
                    <div>
                        {props.children}
                    </div>
                </div>
            </Animated>
        </div>

    )
};

export default Modal
