import React, {Component} from 'react';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import Order from './Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    state={
        orders: [],
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true});
        axios.get('/order.json')
            .then((res) => {
                const order=[];
                for (let ele in res.data){
                    order.push({
                        ...res.data[ele],
                        id: ele
                    });
                }
                this.setState({orders: order});
                this.setState({loading: false});
                console.log(this.state.orders);
            });
    }
    render(){
        let orders = this.state.orders.map((ele,i) => {
            return <Order
                        key={i}
                        name={ele.name}
                        ingredients={ele.ingredients}
                        price={ele.price}
                        address={ele.address} 
                    />
        });
        if(this.state.loading){
            orders= <Spinner />
        }
        return (
            <div className={classes.Orders}>
                <h3>Your Orders!</h3>
                {orders}
            </div>
        );
    }
}

export default Orders;