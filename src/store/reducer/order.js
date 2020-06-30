import * as actions from '../actions/actions';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state=initState,action) => {
    switch (action.type){
        case actions.START_FETCHING:
            return {
                ...state,
                loading: true
            }
        case actions.GET_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actions.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actions.GET_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            }
        case actions.PURCHASED:
            return {
                ...state,
                purchased: false
            }
        case actions.SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                purchased: true
            };
        case actions.FAIL:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;