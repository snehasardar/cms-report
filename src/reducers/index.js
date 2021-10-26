import { combineReducers } from 'redux';

import auth from './auth.reducer';
import signCart from './signup.reducer'
import customerCart from './customer.reducer'
import booksCart from './books.reducer';


const reducers = combineReducers({
    auth,
    signCart,
    customerCart,
    booksCart,
});

export default reducers;