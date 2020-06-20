import React from 'react';
import classes from './Pizza.module.css';
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';


const pizza = (props) => {
    let things= [];
    for (let item in props.ingredients){
        if(props.ingredients[item]){
            things.push(item);
        }
    }
    let ingredients = things.map((ele,i) => {
        return <PizzaIngredient key={i} type={ele} />
    });
    if(ingredients.length===0){
        ingredients= <p>Choose some toppings, we insist!</p>
    }
    return (
        <div className={classes.Pizza}>
            <PizzaIngredient type='pizza-base' />
            {ingredients}
        </div>
    );
};

export default pizza;