import { SIGN_UP,  LOG_OFF } from "../action-types/action.types";

const initialStates = {
	userData: [],
	userToken : '',
    
};

const registration = (state = initialStates, action) => {
	switch (action.type) {
		case SIGN_UP:
			// let allUserData= [...state.userData];
			// 	console.log('allUserData',allUserData)
			// let newUser = action.payload;
			// allUserData.push(newUser);
			// console.log('newUser',newUser);
			let token = 'userLoggedIn';
				console.log('token',token);
			return {
				...state.userData,
				userData: action.payload,
				userToken : token,
				}

		// case LOG_IN:
			
		// 	return {
		// 	...state,
		// 	userToken : token,
		// 	}

		case LOG_OFF:
			// let renewedUser = [...state.userData];
			// let loggedOutUser = renewedUser.filter((item) => item.id != action.payload);
			// renewedUser = loggedOutUser;
			// console.log(' renewedUser',renewedUser);
			return {
			...state,
			userData: [],
			userToken : '',
			}

		default:
			return state;
	}
};

export default registration;
