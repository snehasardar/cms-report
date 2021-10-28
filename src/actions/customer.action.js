import { ADD_LIST, DELETE_LIST, EDIT_LIST, CLEAR_LIST } from '../action-types/action.types';


export const addList = (data) => {
	
	return (dispatch) => {
		dispatch({
			type: ADD_LIST,
			payload: data,
		});
		
	};
};

export const deleteList = (data) => {
	return (dispatch) => {
		dispatch({
			type: DELETE_LIST,
			payload: data,
		});
	};
};

export const editList = (data) => {
	return (dispatch) => {
		dispatch({
			type: EDIT_LIST,
			payload: data,
		});
	};
};

export const clearList = (payload) => {
	return (dispatch) => {
		dispatch({
			type : CLEAR_LIST,
			payload: payload,
		});
	};
};
