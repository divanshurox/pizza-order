import React from 'react';
import classes from './Item.module.css';
import {NavLink} from 'react-router-dom';

const item = (props) => {
    return (
        <li className={classes.Item}>
            <NavLink to={props.link} exact activeStyle={{borderBottom: '4px solid #40A4C8'}} className={props.active && classes.active}>{props.children}</NavLink>
        </li>
    );
};

export default item;