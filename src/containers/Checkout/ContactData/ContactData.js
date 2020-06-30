import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/Input/Input';
import {connect} from 'react-redux';
import {orderTrigger} from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your State'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your pin code'
                },
                value: '',
                validation: {
                    required: true,
                    maxLen: 6
                },
                valid: false,
                touched: false
            },
            phnNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLen: 10,
                    maxLen: 10
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', display: 'Fastest'},{value: 'cheapest', display: 'Cheapest'}]
                },
                validation: {
                    required: true
                },
                valid: true,
                value: 'fastest'
            }
        },
        loadOrderBtn: false
    }
    handleClick = (e) => {
        console.log(this.state.orderForm);
        const ingredient=[];
        for (let ele in this.props.ing){
            if(this.props.ing[ele]){
                ingredient.push(ele);
            }
        }
        const formData = {};
        for (let ele in this.state.orderForm){
            formData[ele]=this.state.orderForm[ele].value;
        }
        const order= {
            customer: formData,
            ingredients: ingredient,
            price: this.props.cost,
            userId: this.props.userId
        };
        this.props.handleOrder(order,this.props.token);
        e.preventDefault();
    }

    checkValidity = (value,rules) => {
        let isValid= true;
        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }
        if(rules.maxLen>0){
            isValid = value.length >= rules.maxLen && isValid;
        }
        if(rules.minLen){
            isValid = value.length <= rules.minLen && isValid;
        }
        return isValid;
    }

    changeHandler = (e,indentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        updatedOrderForm[indentifier].value=e.target.value;
        updatedOrderForm[indentifier].valid=this.checkValidity(updatedOrderForm[indentifier].value,updatedOrderForm[indentifier].validation);
        updatedOrderForm[indentifier].touched = true;
        let formIsValid=true;
        for (let ele in updatedOrderForm){
            formIsValid = updatedOrderForm[ele].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, loadOrderBtn: formIsValid});
    }

    render(){
        const formEntries = [];
        for (let ele in this.state.orderForm){
            formEntries.push({
                id: ele,
                config: this.state.orderForm[ele]
            });
        }
        let form = (
            <form>
                    {formEntries.map((ele,i) => {
                        return <Input 
                                    key={ele.id}
                                    changed={(event) => {this.changeHandler(event,ele.id)}}
                                    elementType={ele.config.elementType} 
                                    elementConfig={ele.config.elementConfig}
                                    value={ele.config.value}
                                    shouldValidate={ele.config.validation}
                                    touched={ele.config.touched}
                                    invalid={ele.config.valid} 
                                />
                    })}
                    <br />
                    <Button variant="outlined" color='secondary' disabled={!this.state.loadOrderBtn} onClick={this.handleClick}>ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form= <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h3>Please Enter your details!</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.pizza.ingredients,
        cost: state.pizza.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleOrder: (details,token) => dispatch(orderTrigger(details,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);

