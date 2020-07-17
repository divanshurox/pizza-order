import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorise } from '../../store/actions/index';

export class LoginGoogle extends Component {
    render() {
        const responseGoogle = (res) => {
            console.log(res);
            this.props.signUp(res, 'UP');
        }
        return (
            <div>
                <div className="row" style={{ margin: '100px auto' }}>
                    <div className="col-sm-12">
                        <GoogleLogin
                            clientId="950228088975-4km7vupofq272ln9b99u3i195ark53l6.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (res, val) => dispatch(authorise(res, val))
    }
}

export default connect(null, mapDispatchToProps)(LoginGoogle)
