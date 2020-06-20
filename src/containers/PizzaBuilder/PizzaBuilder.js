import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Pizza from '../../components/Pizza/Pizza';
import classes from './PizzaBuilder.module.css';
import BuildControls from '../../components/Pizza/BuildControls/BuildControls';
import LowPart from '../../components/UI/LowPart/LowPart';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import pizza from '../../assets/pizza.png';
// import Modal from '../../components/UI/Modal/Modal';
// This is me
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

export default class PizzaBuilder extends Component{
    state={
        ingredients: {
            pepperoni: false,
            onions: false,
            sausage: false,
            peppers: false,
            chicken: false,
            jalapenos: false,
            olives: false,
            mushrooms: false
        },
        totalPrice: 550,
        showBackdrop: false,
        showModal: false
    }

    addHandler = (type) => {
        const oldIng= {...this.state.ingredients};
        oldIng[type]=true;
        this.setState({ingredients: oldIng});
        const newPrice= this.state.totalPrice+PRICE_LIST[type];
        this.setState({totalPrice: newPrice});
    }

    remHandler = (type) => {
        const oldIng= {...this.state.ingredients};
        oldIng[type]=false;
        this.setState({ingredients: oldIng});
        const newPrice= this.state.totalPrice-PRICE_LIST[type];
        this.setState({totalPrice: newPrice});
    }

    modalOpenHandler = () => {
        this.setState({showModal: true});
    }
    modalCloseHandler = () => {
        this.setState({showModal: false});
    }

    render(){
        const addDisabledInfo= {...this.state.ingredients};
        for (let ele in addDisabledInfo){
            addDisabledInfo[ele] = addDisabledInfo[ele]===true;
        }
        const remDisabledInfo= {...this.state.ingredients};
        for (let ele in addDisabledInfo){
           remDisabledInfo[ele] = remDisabledInfo[ele]===false;
        }
        let ingredients= [];
        for (let ele in this.state.ingredients){
            if(this.state.ingredients[ele]){
            ingredients.push(<p style={{fontWeight: 'bold', textTransform: 'capitalize',border: '1px solid black', borderRadius: '5px', width: '100%'}} id="transition-modal-description">{ele}</p>)
            }
        }
        return (
            <div className={classes.all}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.Modal}
                    open={this.state.showModal}
                    onClose={this.modalCloseHandler}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.showModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Review Your Order!</h2>
                        <h3>Toppings: </h3>
                        <div className={classes.modalBox}>
                            <img className={classes.img1} src={pizza} alt=" "/>
                            <div className={classes.ing}>
                                {ingredients}
                            </div>
                            <img className={classes.img2} src={pizza} alt=" "/>
                        </div>
                    </div>
                    </Fade>
                </Modal>
                <div className={classes.box}>
                    <Pizza ingredients={this.state.ingredients}/>
                </div>
                <BuildControls 
                    addHandler={this.addHandler} 
                    remHandler={this.remHandler} 
                    disabledRem={remDisabledInfo} 
                    disabledAdd={addDisabledInfo}
                    price= {this.state.totalPrice}
                    showModal={this.modalOpenHandler}
                />
                <LowPart />
            </div>
        );
    }
}