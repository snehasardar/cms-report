import { ADD_MOBILE, EDIT_MOBILE, DELETE_MOBILE, CLEAR_MOBILES, AUTOFILL_MOBILES  } from '../action-types/action.types';

export const addMobile = (data) => {
	return (dispatch) => {
		dispatch({
			type: ADD_MOBILE,
			payload: data,
		});
	};
};

export const autoFillMobiles = (data) => {
	
	return (dispatch) => {
		dispatch({
			type: AUTOFILL_MOBILES,
			payload: data,
		});
	};
};

export const deleteMobile = (data) => {
	return (dispatch) => {
		dispatch({
			type: DELETE_MOBILE,
			payload: data,
		});
	};
};

export const editMobile = (data) => {
	return (dispatch) => {
		dispatch({
			type: EDIT_MOBILE,
			payload: data,
		});
	};
};

export const clearMobile = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAR_MOBILES,
		});
	};
};
