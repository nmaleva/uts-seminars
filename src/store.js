// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from './reducers/rootReducer';
// import {app, base} from './firebase/base';
// import database from './firebase/database';


// /**
//  * ACTION TYPES
//  */
// const GET_SEMINARS = 'get seminars'

// /**
//  * ACTION CREATORS
//  */
// export const getSeminars = (seminars) => ({type: GET_SEMINARS, seminars})

// /**
//  * THUNKS
//  */
// export function getSeminarsThunk() {
//   return dispatch => {
//     const seminars = [];
//     database.ref('/').once('value', snap => {
//       snap.forEach(data => {
//         let seminar = data.val();
//         seminars.push(seminar);
//       })
//     })
//   }
// }

// /**
//  * REDUCER
//  */
// function Reducer (state = [], action) {
//   switch(action.type) {
//     case GET_SEMINARS:
//       return action.seminars;
//     default: 
//       return state
//   }
// }

// export default createStore (Reducer,  applyMiddleware(thunkMiddleware))