import { ADD_LIST, DELETE_LIST } from '../action-types/action.types';

const initialStates = {
	customerData: [],
	
};

const customerCart = (state = initialStates, action) => {
	switch (action.type) {
		case ADD_LIST:
			let newcustomerData = [...state.customerData];
			console.log('action.payload', action.payload);
			newcustomerData.push(action.payload);
			return {
				...state,
				customerData: newcustomerData,
			};
		case DELETE_LIST:
			let arr = [...state.customerData];
			const newList = arr.filter((item) => item.first_name != action.payload);
			arr = newList;
			console.log(' newList', newList);
			console.log(' newList', newList);
			return {
				...state,
				customerData: arr,
			};

		default:
			return state;
	}
};

export default customerCart;

/**
const { id, data } = action.payload;

			return {
				...state,
				customerData: [
					...state.customerData,
					{
						id: id,
						data: data,
					},
				],
			};





            let newcustomerData = [...state.customerData]
            newcustomerData.push(action.payload)
			    return {
                    ...state,
                    customerData: newcustomerData
			};
 */
