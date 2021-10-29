import { toast } from 'react-toastify';
import { SIGN_UP, LOG_IN, LOG_OFF } from '../action-types/action.types';

const initialStates = {
	userData: [],
	userToken: '',
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
			let totalUser = [...state.userData];
			let loggedUser = [];
			if ((loggedUser = totalUser.find((item) => item == action.payload))) {
				console.log('loggedUser', loggedUser);
				toast.success('successfully login');
			} else {
				toast.warning('Invalid credential');
			}
			const token = 'userLoggedIn';
			console.log('token', token);
			return {
				...state,
				userToken: token,
			};

		case LOG_OFF:
			return {
				...state,
				userToken: '',
			};

		default:
			return state;
	}
};

export default registration;
