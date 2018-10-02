import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import store from './store'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer);


ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();