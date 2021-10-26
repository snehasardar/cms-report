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

/**
 let newName = olddata.map(a => a.first_name)
			console.log('newName',newName) 
			it returns [sneha] an array
 */

/* 
let newName = data.first_name ;
			console.log('newName',newName) sneha




let previousId = 0;
let num = 100000;
export const addList = (data) => {
	let olddata = [data];
	const id = previousId + 1;
	Object.assign(data, { id });
	let newName = data.first_name;
	for (let i = 1; i <= olddata.length; i++) {
		let updatename = newName.substr(0, 3);
		let number = num + 1;
		let regno = '';
		regno = updatename.concat(number);
		Object.assign(data, { regno });
		num = number;
	}
	return (dispatch) => {
		dispatch({
			type: ADD_LIST,
			payload: data,
		});
		previousId = id;
	};
};
*/
