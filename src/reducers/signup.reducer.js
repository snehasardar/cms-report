import { SIGN_UP, LOG_OFF } from "../action-types/action.types";

const initialStates = {
	userData: [],
    
};


const signCart = (state = initialStates, action) => {
	switch (action.type) {
		case SIGN_UP:
			return {
				...state.userData,
				userData: action.payload
				}
		case LOG_OFF:
			return {
			...state,
			userData: [],
			}

		default:
			return state;
	}
};

export default signCart;
