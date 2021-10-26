import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS } from '../action-types/action.types';


export const addBook = (data) => {
	
	return (dispatch) => {
		dispatch({
			type: ADD_BOOKS,
			payload: data,
		});
		
	};
};

export const deleteBook = (data) => {
	return (dispatch) => {
		dispatch({
			type: DELETE_BOOKS,
			payload: data,
		});
	};
};

export const clearBook = (payload) => {
	return (dispatch) => {
		dispatch({
			type : CLEAR_BOOKS,
			payload : payload,
		})
	}
}

