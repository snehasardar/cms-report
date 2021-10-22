import { combineReducers } from 'redux';

import auth from './auth.reducer';
import signCart from './signup.reducer'
import customerCart from './customer.reducer'


const reducers = combineReducers({
    auth,
    signCart,
    customerCart,
});

export default reducers;