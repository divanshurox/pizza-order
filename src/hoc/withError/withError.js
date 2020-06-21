import React from 'react';
import './withError.css';
import {Backdrop} from '@material-ui/core';

const withError = (props) => {
    return <Backdrop open={props.isOpen} onClick={props.handleClick}>
        <div className='error'>
            {props.children}
        </div>
    </Backdrop>
};

export default withError;