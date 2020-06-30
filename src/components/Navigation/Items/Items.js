import React from 'react';
import Item from './Item/Item';
import classes from './Items.module.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const items = (props) => {
    const divert = (path) => {
        props.history.push(path);
    }
    return (
        <ul className={classes.Items}>
            <li>{!props.isAuth&&<button onClick={() => divert('/auth')}>New Customer?</button>}</li>
            <Item link="/">
                Pizza Builder
            </Item>
            {props.isAuth&&<Item link="/orders">
                My Orders
            </Item>}
            {
                !props.isAuth?<Item link="/signIn">
                Sign In
            </Item>:<Item link='/logout'>Logout</Item>
            }
            <Item link="/about">
                About
            </Item>
        </ul>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(withRouter(items));