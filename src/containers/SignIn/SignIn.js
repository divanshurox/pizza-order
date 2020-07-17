import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import classes from './SignIn.module.css';
import { connect } from 'react-redux';
import { auth, changeAuthPath } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter, Redirect } from 'react-router-dom';
import GoogleLogin from '../Auth/LoginGoogle';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                label: 'Email',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLen: 6
                },
                label: 'Password',
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount() {
        if (!this.props.building && this.props.path !== '/') {
            this.props.onSetAuth();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLen) {
            isValid = value.length >= rules.minLen && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    changeHandler = (e, indentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [indentifier]: {
                ...this.state.controls[indentifier],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[indentifier].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitHandler = (e) => {
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, 'IN');
        e.preventDefault();
    }

    render() {
        const formData = [];
        for (let ele in this.state.controls) {
            formData.push({
                id: ele,
                label: this.state.controls[ele].label,
                config: this.state.controls[ele]
            });
        }
        let inputs = formData.map((ele, i) => {
            return <Input
                key={ele.id}
                label={ele.label}
                changed={(e) => { this.changeHandler(e, ele.id) }}
                elementType={ele.config.elementType}
                elementConfig={ele.config.elementConfig}
                value={ele.config.value}
                shouldValidate={ele.config.validation}
                touched={ele.config.touched}
                invalid={ele.config.valid}
            />;
        })
        let form = <Spinner />
        if (!this.props.loading) {
            form = (<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>);
        }
        let authen = null;
        if (this.props.isAuth) {
            authen = <Redirect to={this.props.path} />;
        }
        return (
            <div className='row'>
                <div className='col-md-6'>
                    <div className={classes.Auth}>
                        {authen}
                        <form className='form-signin' onSubmit={this.submitHandler}>
                            <h1 className='h3 mb-3 font-weight-normal'>Please Sign In!</h1>
                            {inputs}
                            {form}
                            <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
                        </form>
                    </div>
                </div>
                <div className='col-md-6'>
                    <GoogleLogin />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.isAuthenticated,
        path: state.auth.authPath,
        building: state.pizza.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuth: () => dispatch(changeAuthPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));