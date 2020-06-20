import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const layout = (props) => {
    return (
        <Aux>
            <ToolBar />
            <main className={classes.content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;