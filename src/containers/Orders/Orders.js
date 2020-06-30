import React, {Component} from 'react';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import Order from './Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import {getOrders} from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component{
    componentDidMount(){
        this.props.handleOrders(this.props.token,this.props.userId);
    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders= this.props.orders.map((ele,i) => {
                return <Order
                            key={i}
                            name={ele.name}
                            ingredients={ele.ingredients}
                            price={ele.price}
                            address={ele.address} 
                        />
            });
        }
        return (
            <div className={classes.Orders}>
                <h3>Your Orders!</h3>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleOrders: (token,id) => dispatch(getOrders(token,id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);