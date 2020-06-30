import React, {Component} from 'react';
import './Checkout.css';
import Pizza from '../../components/Pizza/Pizza';
import {Button} from '@material-ui/core';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import {connect} from 'react-redux';
import {purchasedHandler} from '../../store/actions/index';
import ScrollTop from '../ScrollTop/Scrolltop';

class Checkout extends Component{
    componentWillMount(){
        window.scrollTo(0, 0);
        this.props.purchasedSet();
    }
    handleCancel = () => {
        this.props.history.goBack();
        console.log(this.state.ingredients);
    }
    handleCont = () => {
        this.setState({loadContactData: true});
        this.props.history.replace('/confirmOrder/contact-data');
    }
    render(){
        let redirect = this.props.purchased && <Redirect to="/" />;
        return (
            <div className='all'>
                {redirect}
                <h1>Hope It Tastes Awesome!</h1>
                <div className='box'>
                    <Pizza ingredients={this.props.ing} />
                </div>
                <p>Price: ₹{this.props.cost}</p>
                <Button variant="outlined" color='primary' style={{marginRight: '10px'}} onClick={this.handleCont}>Continue</Button>
                <Button variant="outlined" color='secondary' onClick={this.handleCancel}>Cancel</Button>
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.pizza.ingredients,
        cost: state.pizza.totalPrice,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchasedSet: () => dispatch(purchasedHandler())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);