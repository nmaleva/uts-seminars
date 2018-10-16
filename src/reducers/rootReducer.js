import { combineReducers } from 'redux';
import authReducer from './authReducer';
import seminarReducer from './seminarReducer';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    seminar: seminarReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer