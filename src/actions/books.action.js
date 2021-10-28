import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS, EDIT_BOOKS } from '../action-types/action.types';

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

export const editBook = (data) => {
	return (dispatch) => {
		dispatch({
			type: EDIT_BOOKS,
			payload: data,
		});
	};
};


export const clearBook = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAR_BOOKS,
		});
	};
};
