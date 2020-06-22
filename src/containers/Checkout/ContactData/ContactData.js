import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component{
    state={
        name: '',
        phnNo: '',
        address: {
            street: '',
            code: '',
            city: ''
        },
        email: '',
        loadSpinner: false
    }
    handleClick = (e) => {
        this.setState({loadSpinner: true});
        const ingredient=[];
        for (let ele in this.props.ingredients){
            if(this.props.ingredients[ele]===1){
                ingredient.push(ele);
            }
        }
        const order= {
            name: 'Divanshu Agarwal',
            address: {
                city: 'Rudrapur',
                state: 'Uttrakhand',
                pinCode: '263153'
            },
            phnNo: '8979900301',
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
    render(){
        let form = (
            <form>
                    <input type='text' placeholder='Enter your Name' />
                    <input type='text' placeholder='Enter your Number' />
                    <input type='text' placeholder='Enter your Email' />
                    <input type='text' placeholder='Enter your Address' />
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

