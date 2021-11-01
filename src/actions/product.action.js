import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, } from '../action-types/action.types';

export const addToCart = (data) => {
	return (dispatch) => {
		dispatch({
            type: ADD_TO_CART,
            payload : data,
        });
        console.log('data',data);
	};
};

export const removeItem = (data) => {
	return (dispatch) => {
		dispatch({
            type: REMOVE_ITEM,
            payload : data,
        });
        
	};
};

export const subtractQuantity = (data) => {
	return (dispatch) => {
		dispatch({
            type: SUB_QUANTITY,
            payload : data,
        });
        
	};
};

export const addQuantity = (payload) => {
	return (dispatch) => {
		dispatch({
            type: ADD_QUANTITY,
            payload : payload
        });
        
	};
};


