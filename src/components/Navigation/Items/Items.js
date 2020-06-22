import React from 'react';
import Item from './Item/Item';
import classes from './Items.module.css';

const items = (props) => {
    return (
        <ul className={classes.Items}>
            <Item link="/" active>
                Pizza Builder
            </Item>
            <Item link="/orders">
                My Orders
            </Item>
            <Item link="/about">
                About
            </Item>
        </ul>
    );
};

export default items;