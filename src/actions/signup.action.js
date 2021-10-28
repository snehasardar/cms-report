import { SIGN_UP, LOG_OFF } from '../action-types/action.types';

export const signUp = (data) => {
	return (dispatch) => {
		dispatch({
			type: SIGN_UP,
			payload: data,
		});
		console.log('signUp', data);
	};
};

export const logOff = (payload) => {
	return (dispatch) => {
		dispatch({
            type: LOG_OFF,
        });
	};
};
