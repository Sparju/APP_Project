// src/store.js
import { createStore } from 'redux';
import rootReducer from './services/Reducer';

const store = createStore(rootReducer);

export default store;
