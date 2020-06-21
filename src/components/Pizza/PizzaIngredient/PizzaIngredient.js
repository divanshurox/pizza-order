import React from 'react';
import './PizzaIngredient.css';

const pizzaIngredients = (props) => {
    function toppingHandler(name,amount){
        let all=[];
        for(let i=1;i<=amount;i++){
            all.push(<div className={`topping ${name} ${name}-${i}`}></div>);
        }
        return all;
    }
    let ingredient=null;
    switch (props.type) {
        case('pizza-base'):
            ingredient= <div className='pizza'></div>;
            break;
        case('jalapenos'):
            ingredient= toppingHandler('jalapenos',19);
            break;
        case('pepperoni'):
            ingredient = toppingHandler('pepperoni',12);
            break;
        case('olives'):
            ingredient= toppingHandler('olives',19);
            break;
        case('chicken'):
            ingredient= toppingHandler('chicken',14);
            break;
        case('onions'):
            ingredient= toppingHandler('onions',15);
            break;
        case('peppers'):
            ingredient= toppingHandler('peppers',15);
            break;
        case('mushrooms'):
            ingredient= toppingHandler('mushrooms',11);
            break;
        case('sausage'):
            ingredient= toppingHandler('sausage',12);
            break;
        default:
            ingredient= null;
    }
    return ingredient;
};

export default pizzaIngredients;