import React, {Component} from 'react';
import './App.css';
import Layout from '../src/components/Layout/Layout';
import PizzaBuilder from '../src/containers/PizzaBuilder/PizzaBuilder';
import {Route, Switch, withRouter,Redirect} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import About from './components/About/About';
import Auth from './containers/Auth/Auth';
import SignIn from './containers/SignIn/SignIn';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import {checkAuthState} from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.check();
  }
  render(){
    let routes = (
      <Switch>
        <Route exact path="/" component={PizzaBuilder} />
        <Route path="/auth" component={Auth} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuth){
      routes = (
        <Switch>
            <Route exact path="/" component={PizzaBuilder} />
            <Route path="/confirmOrder" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/about" component={About} />
            <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    check: () => dispatch(checkAuthState())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));
