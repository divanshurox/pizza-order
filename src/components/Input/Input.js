import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let elementType=null;

    switch(props.elementType){
        case ('input'):
            elementType= <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textarea'):
            elementType = <textarea onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case ('select'):
            elementType = (<select onChange={props.changed} className={classes.InputElement}>
                                {props.elementConfig.options.map((ele,i) => {
                                    return <option 
                                                key={i} 
                                                value={ele.value}>
                                                    {ele.display}
                                            </option>
                                })}
                            </select>);
            break;
        default:
            elementType= <input onChange={props.changed} className={classes.InputElement} value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {elementType}
        </div>
    );
}

export default input;