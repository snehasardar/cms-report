import { SIGN_UP, LOG_IN, LOG_OFF } from '../action-types/action.types';

export const signUp = (data) => {
	return (dispatch) => {
		dispatch({
			type: SIGN_UP,
			payload: data,
		});
		console.log('signUp', data);
	};
};

export const logIn = (payload) => {
	return (dispatch) => {
		dispatch({
			type: LOG_IN,
			payload : payload,
			
		});
	};
};

export const logOff = () => {
	return (dispatch) => {
		dispatch({
            type: LOG_OFF,
        });
	};
};
