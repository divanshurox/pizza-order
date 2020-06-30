import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter, Redirect } from 'react-router-dom';

class Auth extends Component{
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
    checkValidity = (value,rules) => {
        let isValid= true;
        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }
        if(rules.minLen){
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

    changeHandler = (e,indentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [indentifier]: {
                ...this.state.controls[indentifier],
                value: e.target.value,
                valid: this.checkValidity(e.target.value,this.state.controls[indentifier].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = (e) => {
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,'UP');
        e.preventDefault();
    }

    render(){
        const formData = [];
        for (let ele in this.state.controls){
            formData.push({
                id: ele,
                label: this.state.controls[ele].label,
                config: this.state.controls[ele]
            });
        }
        let inputs = formData.map((ele,i) => {
            return <Input
                        key={ele.id}
                        label={ele.label}
                        changed={(e) => {this.changeHandler(e,ele.id)}}
                        elementType={ele.config.elementType} 
                        elementConfig={ele.config.elementConfig}
                        value={ele.config.value}
                        shouldValidate={ele.config.validation}
                        touched={ele.config.touched}
                        invalid={ele.config.valid}
                    />;
        });
        let authen=null;
        if(this.props.isAuth){
            authen= <Redirect to='/' />;
        }
        let form = <Spinner />;
        if(!this.props.loading){
            form = (<form className='form-signin' onSubmit={this.submitHandler}>
            <h1 className='h3 mb-3 font-weight-normal'>Please Sign Up</h1>
            {inputs}
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>);
        }
        return (
            <div className={classes.Auth}>
                {authen}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Auth));