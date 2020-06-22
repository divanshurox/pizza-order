import React from 'react';
import './App.css';
import Layout from '../src/components/Layout/Layout';
import PizzaBuilder from '../src/containers/PizzaBuilder/PizzaBuilder';
import {Route, Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={PizzaBuilder} />
          <Route path="/confirmOrder" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/about" component={About} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
