import React, {Component} from 'react';
import classes from './Logout.module.css';
import {logOut} from '../../../store/actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


class Logout extends Component{
    componentDidMount(){
        this.props.onLogout(this.props.history);
    }
    render(){
        return (
            <div className={classes.container}>
                <div className={classes.hero}>
                    <div className={classes.copy}>
                        <h1>We'll surely miss you!</h1>
                        <p>Get back SOOOOOON!</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispachToProps = dispatch => {
    return{
        onLogout: (props) => dispatch(logOut())
    }
}

export default connect(null,mapDispachToProps)(withRouter(Logout));