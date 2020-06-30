import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

class Scroll extends Component{
    componentDidUpdate(prevProps){
        if(prevProps.location.pathname!==this.props.location.pathname){
            window.scrollTo(0,0);
        }
    }
    render(){
        return this.props.children;
    }
}

export default withRouter(Scroll);