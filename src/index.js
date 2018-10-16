import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import database from './firebase/config'

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(database),
        reactReduxFirebase(database, {attachAuthIsReady: true})
    )
);

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
           <App />
        </Provider>,
        document.getElementById('root')
    );
    registerServiceWorker();
})

