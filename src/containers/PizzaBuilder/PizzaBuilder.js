import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Pizza from '../../components/Pizza/Pizza';
import classes from './PizzaBuilder.module.css';
import BuildControls from '../../components/Pizza/BuildControls/BuildControls';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import pizza from '../../assets/pizza.png';
import { Button } from '@material-ui/core';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {addIngredients,remIngredients,initIngredients,changeAuthPath} from '../../store/actions/index';
import { withRouter } from 'react-router-dom';


class PizzaBuilder extends Component{
    state={
        showBackdrop: false,
        showModal: false,
        loadSpinner: false,
        showFinalPage: false
    }

    componentDidMount(){
        this.props.initIngredients();
    }

    modalOpenHandler = () => {
        if(!this.props.isAuth){            
            this.props.changePath('/confirmOrder');
            this.props.history.replace('/signIn');
        }else{
            this.setState({showModal: true});
        }
    }
    modalCloseHandler = () => {
        this.setState({showModal: false});
    }

    handleOrder = () => {
        this.props.history.push('/confirmOrder');
    }

    render(){
        const addDisabledInfo= {...this.props.ing};
        for (let ele in addDisabledInfo){
            addDisabledInfo[ele] = addDisabledInfo[ele]===true;
        }
        const remDisabledInfo= {...this.props.ing};
        for (let ele in addDisabledInfo){
           remDisabledInfo[ele] = remDisabledInfo[ele]===false;
        }
        let ingredients= [];
        for (let ele in this.props.ing){
            if(this.props.ing[ele]){
            ingredients.push(<li style={{fontWeight: 'bold', textTransform: 'capitalize',border: '1px solid black', borderRadius: '5px', width: '100%'}} id="transition-modal-description">{ele}</li>)
            }
        }
        let burger = this.props.loading && <Spinner />;
        if(this.props.ing){
            burger = (
                <Aux>
                    <div className={classes.box}>
                        <Pizza ingredients={this.props.ing}/>
                    </div>
                    <BuildControls 
                        addHandler={this.props.addIngredient} 
                        remHandler={this.props.remIngredient} 
                        disabledRem={remDisabledInfo} 
                        disabledAdd={addDisabledInfo}
                        price= {this.props.cost}
                        showModal={this.modalOpenHandler}
                        isAuth={this.props.isAuth}
                    />
                </Aux>
            );
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
                                <ol>
                                    {ingredients}
                                </ol>
                            </div>
                            <img className={classes.img2} src={pizza} alt=" "/>
                        </div>
                        {this.props.loading&&<Spinner />}
                        <Button onClick={this.handleOrder} variant='outline' style={{color: 'green',border: '1px solid green', marginRight: '10px'}}>Continue</Button>
                        <Button onClick={() => {this.setState({showModal: false})}} variant="outlined" color="secondary">Cancel</Button>
                    </div>
                    </Fade>
                </Modal>
                {burger}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.pizza.ingredients,
        cost: state.pizza.totalPrice,
        loading: state.pizza.loading,
        isAuth: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (type) => dispatch(addIngredients(type)),
        remIngredient: (type) => dispatch(remIngredients(type)),
        initIngredients: () => dispatch(initIngredients()),
        changePath: (path) => dispatch(changeAuthPath(path))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PizzaBuilder));