import React from 'react';
import classes from './Modal.css';
import PropTypes from 'prop-types';

const modal = (props) => {
    return (<div className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        }}>
        {props.children}
    </div>)
}

modal.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default modal;
