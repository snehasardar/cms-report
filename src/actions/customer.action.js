import { ADD_LIST, DELETE_LIST } from '../action-types/action.types';

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

// let previousId = 0;
// export const addList = (data) => {
// 	// let previousId = 0;
// 	console.log('previousId',previousId);
// 	const id = previousId + 1;
// 	console.log('id', id);
// 	return (dispatch) => {
// 		dispatch({
// 			type: ADD_LIST,
// 			payload: {
// 				id : id,
// 				data : data,
// 			},
// 		});
// 		previousId = id;
// 		console.log('after dispatch',previousId );

// 	};

// };
