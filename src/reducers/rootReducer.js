import { combineReducers } from 'redux';
import authReducer from './authReducer';
import seminarReducer from './seminarReducer';
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    seminar: seminarReducer,
    firestore: firestoreReducer
})

export default rootReducer