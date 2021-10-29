import { ADD_LIST, DELETE_LIST, EDIT_LIST, CLEAR_LIST } from '../action-types/action.types';

const initialStates = {
	customerData: [],
};

const addCart = (state, action) => {
	let newCustomerData = [...state.customerData];
	const totalCustomer = newCustomerData.length;
	if (totalCustomer > 0) {
		let id = newCustomerData[totalCustomer - 1].id + 1; //take the id of last customer
		let subtringName = action.payload.first_name.substring(0, 4);
		let regNum = subtringName + 1000 + id;
		let customer = {
			...action.payload,
			id,
			registration_num: regNum,
		};
		newCustomerData.push(customer);
	} else {
		let id = 1;
		let subtringName = action.payload.first_name.substr(0, 4);
		let regNum = subtringName + 1000 + id;
		let renewedData = { ...action.payload, id, registration_num: regNum };
		newCustomerData.push(renewedData);
	}
	return {
		...state,
		customerData: newCustomerData,
	};
};

const customerReducer = (state = initialStates, action) => {
	switch (action.type) {
		case ADD_LIST:
			return addCart(state, action);

		case DELETE_LIST:
			let newList = [...state.customerData];
			let freshData = newList.filter((item) => item.id !== action.payload);
			newList = freshData;
			console.log('freshData', freshData);
			console.log(' newList', newList);
			return {
				...state,
				customerData: newList,
			};

		case EDIT_LIST:
			let existingData = [...state.customerData];
			let newData = existingData.map((item) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						...action.payload,
					};
				}
				return item;
			});
			console.log(' existingData', existingData);
			return {
				...state,
				customerData: newData,
			};

		case CLEAR_LIST:
			return {
				...state,
				customerData: [],
			};

		default:
			return state;
	}
};

export default customerReducer;