import React from 'react';
import pizza from '../../assets/pizza.png';
import classes from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={pizza} alt=" " />
        </div>
    );
};

export default logo;