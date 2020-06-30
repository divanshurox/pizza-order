import React, {Component} from 'react';
import classes from './Scrolltop.module.css';
import {FaArrowCircleUp} from 'react-icons/fa';

class ScrollTop extends Component{
    state={
        visible:false,
        reachedDown: false
    }
    componentDidMount(){
        document.addEventListener("scroll",(e) => {
            this.toggleButton();
        });
    }
    toggleButton = () => {
        if(window.pageYOffset>300){
            this.setState({visible: true});
        }else{
            this.setState({visible: false,reachedDown: false});
        }
        if(window.pageYOffset>1090){
            this.setState({reachedDown:true})
        }else{
            this.setState({reachedDown: false});
        }
    }
    clickHandler = (e) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    render(){
        const isVisible= this.state.visible;
        return (
            <div className={classes.Top}>
                {isVisible&&<div onClick={() => this.clickHandler()}>
                        <FaArrowCircleUp size={28} color={this.state.reachedDown?'aliceblue':'black'} />
                    </div>}
            </div>
        );
    }
}

export default ScrollTop;