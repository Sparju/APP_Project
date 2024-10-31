// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './store.js/Reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
