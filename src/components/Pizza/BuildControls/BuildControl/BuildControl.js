import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <Button variant="contained" color="primary" onClick={props.remClicked} disabled={props.disabledRem}>Remove</Button>
            <Button variant="contained" color="secondary" onClick={props.addClicked} disabled={props.disabledAdd}>Add</Button>
        </div>
    );
};

export default buildControl;