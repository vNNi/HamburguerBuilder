import React from 'react';
import classes from './Modal.css';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';

const modal = React.memo((props) => {
    return (
        <>
            <Backdrop show={props.show} click={props.closeModal} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                }}>
                {props.children}
            </div>
        </>
    )
});

modal.propTypes = {
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default modal;
