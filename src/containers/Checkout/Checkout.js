import React, {Component} from 'react';
import './Checkout.css';
import Pizza from '../../components/Pizza/Pizza';
import {Button} from '@material-ui/core';
import {Route} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

export default class Checkout extends Component{
    state={
        ingredients: null,
        totalPrice: 0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ing = {};
        let price = 0;
        for (let param of query.entries()){
            if(param[0]==='price'){
                price = +param[1];
            }else{
                ing[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ing, totalPrice: price});
        
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
        return (
            <div className='all'>
                <h1>Hope It Tastes Awesome!</h1>
                <div className='box'>
                    <Pizza ingredients={this.state.ingredients} />
                </div>
                <p>Price: ₹{this.state.totalPrice}</p>
                <Button variant="outlined" color='primary' style={{marginRight: '10px'}} onClick={this.handleCont}>Continue</Button>
                <Button variant="outlined" color='secondary' onClick={this.handleCancel}>Cancel</Button>
                <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}