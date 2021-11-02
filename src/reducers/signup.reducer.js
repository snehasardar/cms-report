import { SIGN_UP, LOG_IN, LOG_OFF } from '../action-types/action.types';

const initialStates = {
	userData: [],
	userToken: '',
	loggedIn : false,
};

const registration = (state = initialStates, action) => {
	switch (action.type) {
		case SIGN_UP:
			let allUserData = [...state.userData];
			let newUser = action.payload;
			allUserData.push(newUser);
			console.log('newUser', newUser);

			return {
				...state,
				userData: allUserData,
			};

		case LOG_IN:
			let token = 'userLoggedIn';
			console.log('token', token);
			
			return {
				...state,
				userToken: token,
				loggedIn : true,
			};

		case LOG_OFF:

			return {
				...state,
				userToken: '',
				loggedIn : false,
			};

		default:
			return state;
	}
};

export default registration;
