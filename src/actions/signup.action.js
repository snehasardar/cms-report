import { SIGN_UP } from '../action-types/action.types';

export const signUp = (data) => {
	return (dispatch) => {
		dispatch({
			type: SIGN_UP,
			payload: data,
		});
		console.log('signUp', data);
	};
};
