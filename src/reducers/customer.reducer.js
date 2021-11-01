import { ADD_LIST, DELETE_LIST, EDIT_LIST, CLEAR_LIST, ADDALL_DATA } from '../action-types/action.types';

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
		// let fullName = action.payload.initial +' '+ action.payload.first_name +' '+ action.payload.middle_name +' '+ action.payload.last_name;
		// console.log('fullName', fullName)
		let customer = {
			...action.payload,
			id,
			registration_num: regNum,
			// full_name : fullName ,
		};
		newCustomerData.push(customer);
	} else {
		let id = 1;
		let subtringName = action.payload.first_name.substr(0, 4);
		let regNum = subtringName + 1000 + id;
		// let fullName = action.payload.initial +' '+ action.payload.first_name +' '+ action.payload.middle_name +' '+ action.payload.last_name;
		// console.log('fullName', fullName)
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

		case ADDALL_DATA:
			let oldData = [...state.customerData];
			let localValue = action.payload; 
				console.log('localValue',localValue);
			const totalData = oldData.length;
			let id = 0;
			for(let i=0; i < localValue.length; i++){
				if (totalData > 0) {
					let id = oldData[totalData - 1].id + 1; 
					let newValue = {
						...localValue[i],id,};
					oldData.push(newValue);
					console.log('newValue',newValue)
					console.log('localValue[i].first_name',localValue[i].first_name)
				} else {
					
					id = id + 1;
					let newValue = {
						...localValue[i],id,};
					oldData.push(newValue);
					console.log('newValue',newValue)
				}
			} 
			console.log('oldData',oldData);
			return {
				customerData: oldData,
			};
			
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

/**
 * let newValue = localValue.map((item) => {
					return{
						initial: item.initial,
						first_name: item.first_name,
						middle_name: item.middle_name,
						last_name: item.last_name,
						fullname: item.fullname,
						mobile_no: item.mobile_no,
						email: item.email,
						status: item.status,
						registration_num: item.registration_num,
					}
				})
 */