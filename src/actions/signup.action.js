import { SIGN_UP, LOG_IN, LOG_OFF } from '../action-types/action.types';

export const signUp = (data) => {
	return (dispatch) => {
		dispatch({
			type: SIGN_UP,
			payload: data,
		});
	};
};

export const logIn = () => {
	return (dispatch) => {
		dispatch({
			type: LOG_IN,
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
