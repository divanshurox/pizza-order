import * as action from './actions';
import axios from '../../axios-orders';
import order from '../../containers/Orders/Order/Order';
import { useImperativeHandle } from 'react';

export const success = (id,orderData) => {
    return {
        type: action.SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const fail = (error) => {
    return {
        type: action.FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: action.START_FETCHING
    }
}

export const purchasedHandler = () => {
    return {
        type: action.PURCHASED
    }
}

export const orderTrigger = (details,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,details)
            .then((res) => {
                dispatch(success(res.data.name,details));
            })
            .catch((err) => {
                dispatch(fail(err));
            });
    };
};

export const ordersImpartSuccess = (allOrders) => {
    const orders=[];
    for (let ele in allOrders){
        orders.push({
            ...allOrders[ele],
            id: ele
        });
    }
    console.log(orders);
    return {
        type: action.GET_ORDERS_SUCCESS,
        orders: orders
    }
}

export const ordersImpartFail = (error) => {
    return{
        type:action.GET_ORDERS_FAILED,
        error: error
    }
}

export const ordersImpartStart = () => {
    return{
        type:action.GET_ORDERS_START
    }
}

export const getOrders = (token,id) => {
    return dispatch => {
        dispatch(ordersImpartStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+id+'"';
        axios.get('/orders.json'+queryParams)
            .then((res) => {
                console.log(res.data);
                dispatch(ordersImpartSuccess(res.data));
            })
            .catch((err) => {
                dispatch(ordersImpartFail(err));
            });
    };
};