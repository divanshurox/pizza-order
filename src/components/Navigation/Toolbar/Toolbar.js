import React from 'react';
import Items from '../Items/Items';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div onClick={props.showSide} className={classes.Logo}>
                <Logo/>
            </div>
            <div className={classes.Name}>
                <p>Pizz-o-Mania</p>
            </div>
            <nav className={classes.DesktopOnly}>
                <Items />
            </nav>
        </header>
    );
};


export default toolbar;