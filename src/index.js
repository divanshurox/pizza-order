import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pizzaReducer from './store/reducer/pizzaBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  pizza: pizzaReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

