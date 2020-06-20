import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MailIcon from '@material-ui/icons/Mail';

class Layout extends Component{
    state={
        showSide:false
    }
    handleSide= () => {
        this.setState({showSide: true});
    }
    handleOpenSide = () => {
        this.setState({showSide: false})
    }
    render(){
        const list = (
            <div
              className={classes.list}
              role="presentation"
              onClick={() => {this.handleOpenSide()}}
              onKeyDown={() => {this.handleSide()}}
            >
              <List>
                <ListItem button>
                        <ListItemIcon><LocalPizzaIcon /></ListItemIcon>
                        <ListItemText primary='Pizz-o-Mania' />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                        <ListItemIcon><BuildIcon /></ListItemIcon>
                        <ListItemText primary='Pizza Builder' />
                </ListItem>
                <ListItem button>
                        <ListItemIcon><BorderColorIcon /></ListItemIcon>
                        <ListItemText primary='Your Orders' />
                </ListItem>
              </List>
            </div>
          );
        return (
            <Aux>
                {
                    this.state.showSide&& <SwipeableDrawer
                                            open={this.state.showSide}
                                            onClose={this.handleOpenSide}
                                            onOpen={this.handleSide}
                                        >
                                            {list}
                                        </SwipeableDrawer>
                }
                <ToolBar showSide={this.handleSide} />
                    <main className={classes.content}>
                        {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;