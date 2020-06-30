import * as actions from './actions';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type: actions.ADD_INGREDIENTS,
        ingredient: name
    }
}

export const remIngredients = (name) => {
    return {
        type: actions.REM_INGREDIENTS,
        ingredient: name
    }
}

export const getIngredients = (ingredients) => {
    return {
        type: actions.GET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setError = () => {
    return {
        type: actions.SET_ERROR
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then((res) => {
                dispatch(getIngredients(res.data));
            })
            .catch((err) => {
                dispatch(setError());
            });
    }
}