import React from 'react';
import './App.css';
import Layout from '../src/components/Layout/Layout';
import PizzaBuilder from '../src/containers/PizzaBuilder/PizzaBuilder';
function App() {
  return (
    <div className="App">
      <Layout>
        <PizzaBuilder />
      </Layout>
    </div>
  );
}

export default App;
