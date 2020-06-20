import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';

class Modal extends Component{
    render(){
        const ingredients= [];
        for (let ele in this.props.ingredients){
            this.props.ingredients[ele] && ingredients.push(<p style={{fontWeight: 'bold'}}>{ele}</p>);
        }
        return (
            <div className={classes.Modal} style={{
                transform: this.props.show ? 'translateY(0)' : 'translate(-100vh)'
            }}>
                <h3>Your Order!</h3>
                {ingredients}
            </div>
        );
    }
}

export default Modal;