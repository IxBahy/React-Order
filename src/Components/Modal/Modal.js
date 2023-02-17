import React from 'react'
import classes from './Modal.module.css'
import ReactDOM from "react-dom";
const Backdrop = () => {
    return (<div className={classes.backdrop}></div>)
}
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}
const protalContainer = document.getElementById('overlays')
export const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop />, protalContainer)}
            {ReactDOM.createPortal(
                <ModalOverlay >
                    {props.children}
                </ModalOverlay>
                , protalContainer)}

        </>
    )
}
