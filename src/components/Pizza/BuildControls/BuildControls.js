import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

const controls = [
    {label: 'Sausage', type: 'sausage',},
    {label: 'Chicken', type: 'chicken'},
    {label: 'Pepperoni', type: 'pepperoni'},
    {label: 'Onions', type: 'onions'},
    {label: 'Peppers', type: 'peppers'},
    {label: 'Olives', type: 'olives'},
    {label: 'Mushrooms', type: 'mushrooms'},
    {label: 'Jalapenos', type: 'jalapenos'},
];

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

const buildControls = (props) => {
    let control= controls.map((ele) => {
        return <BuildControl 
                    label={ele.label}
                    price={PRICE_LIST[ele.type]} 
                    addClicked={() => props.addHandler(ele.type)} 
                    remClicked={() => props.remHandler(ele.type)}
                    disabledRem={props.disabledRem[ele.type]}
                    disabledAdd={props.disabledAdd[ele.type]} 
        />;
    })
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: ₹{props.price}</p>
            {control}
            <br />
            <br />
            <Fab variant="extended" onClick={props.showModal} disabled={props.price<=550}>
                    {props.isAuth?'Order Now':'Log IN!'}
            </Fab>
        </div>
    );
};

export default buildControls;