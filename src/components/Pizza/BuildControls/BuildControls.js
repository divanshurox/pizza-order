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

const buildControls = (props) => {
    let control= controls.map((ele) => {
        return <BuildControl 
                    label={ele.label}
                    price={props.priceList[ele.type]} 
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
                    Order Now
            </Fab>
        </div>
    );
};

export default buildControls;