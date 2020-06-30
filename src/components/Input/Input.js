import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let elementType=null;
    let inputClasses = [classes.InputElement];
    if(props.invalid!==true && (props.shouldValidate && props.touched)){
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case ('input'):
            elementType= <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textarea'):
            elementType = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            break;
        case ('select'):
            elementType = (<select onChange={props.changed} className={inputClasses.join(' ')}>
                                {props.elementConfig.options.map((ele,i) => {
                                    return <option 
                                                key={i} 
                                                value={ele.value}>
                                                    {ele.display}
                                            </option>
                                })}
                            </select>);
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {elementType}
        </div>
    );
}

export default input;