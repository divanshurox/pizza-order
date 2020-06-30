import * as actions from '../actions/actions';

const PRICE_LIST = {
    pepperoni: 40,
    onions: 50,
    sausage: 60,
    peppers: 30,
    chicken: 70,
    jalapenos: 40,
    olives: 40,
    mushrooms: 60
}

const initState = {
    ingredients: null,
    totalPrice: 550,
    loading: false,
    building: false
}

const reducer = (state=initState,action) => {
    switch(action.type){
        case actions.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: true
                },
                totalPrice: state.totalPrice+PRICE_LIST[action.ingredient],
                building: true
            };
        case actions.REM_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:false
                },
                totalPrice: state.totalPrice-PRICE_LIST[action.ingredient],
                building: true
            };
        case actions.GET_INGREDIENTS: 
            return {
                ...state,
                ingredients:action.ingredients,
                loading: false,
                totalPrice: 550,
                building: false
            };
        case actions.SET_ERROR:
            return {
                ...state,
                loading: true
            };
    }
    return state;
}

export default reducer;