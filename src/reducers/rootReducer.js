import { combineReducers } from 'redux';
import authReducer from './authReducer';
import seminarReducer from './seminarReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    seminar: seminarReducer
})

export default rootReducer