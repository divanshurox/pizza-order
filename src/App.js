import React from 'react';
import './App.css';
import Layout from '../src/components/Layout/Layout';
import PizzaBuilder from '../src/containers/PizzaBuilder/PizzaBuilder';
import {Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={PizzaBuilder} />
          <Route path="/orders" component={PizzaBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
