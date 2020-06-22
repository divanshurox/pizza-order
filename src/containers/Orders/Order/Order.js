import React from 'react';
import classes from './Order.module.css';
import pizza from '../../../assets/pizza.png';

const order = (props) => {
    const ingredients= props.ingredients.map((ele,i) => {
        return <span
                    key={i}
                    style={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold'
                    }}>{ele} </span>;
    })
    const addressArr = [];
    for (let ele in props.address){
        addressArr.push(props.address[ele]);
    }
    const addressStr = addressArr.join(' ');
    return (
        <div className={classes.Order}>
            <h4>{props.name}</h4>
            <p>Toppings: {ingredients}</p>
            <p>Price: <span style={{fontWeight: 'bold'}}>₹{props.price}</span></p>
            <p>Address: <span style={{color: 'grey'}}>{addressStr}</span></p>
            <img src={pizza} alt=" " className={classes.Pizza} />
        </div>
    );
};

export default order;