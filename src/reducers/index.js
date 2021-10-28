import { combineReducers } from 'redux';

import auth from './auth.reducer';
import registration from './signup.reducer'
import customerReducer from './customer.reducer'
import booksReducer from './books.reducer';


const reducers = combineReducers({
    auth,
    registration,
    customerReducer,
    booksReducer,
});

export default reducers;