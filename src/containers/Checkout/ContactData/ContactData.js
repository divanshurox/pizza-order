import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/Input/Input';

class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Name'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your City'
                },
                value: ''
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your State'
                },
                value: ''
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your pin code'
                },
                value: ''
            },
            phnNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Number'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: ''
            },
            deliveyMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', display: 'Fastest'},{value: 'cheapest', display: 'Cheapest'}]
                },
                value: ''
            }
        },
        loadSpinner: false
    }
    handleClick = (e) => {
        this.setState({loadSpinner: true});
        console.log(this.state.orderForm);
        const ingredient=[];
        for (let ele in this.props.ingredients){
            if(this.props.ingredients[ele]===1){
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
            price: this.props.price
        };
        axios.post('/order.json',order)
            .then((res) => {
                this.setState({loadSpinner: false});
                this.props.history.replace('/');
            })
            .catch(err => {
                console.log(err);                
            });
        e.preventDefault();
    }

    changeHandler = (e,indentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        updatedOrderForm[indentifier].value=e.target.value;
        this.setState({orderForm: updatedOrderForm});
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
                                />
                    })}
                    <br />
                    <Button variant="outlined" color='secondary' onClick={this.handleClick}>ORDER</Button>
                </form>
        );
        if(this.state.loadSpinner){
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

export default ContactData;

