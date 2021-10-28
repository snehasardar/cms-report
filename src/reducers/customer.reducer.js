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
			const newList = state.customerData.filter((item) => item.id !== action.payload);
			console.log(' newList', newList);
			return {
				...state,
				customerData: newList,
			};

		case EDIT_LIST:
			let existingData = [...state.customerData]
			
			let newData = existingData.map((item )=> {
					if(item.id === action.payload.id){
						return { 
							...item, 
							...action.payload,
						}
					}
					return item
				})
				console.log(' existingData', existingData);
			return {
				...state,
				customerData: newData,
			};

	
		case CLEAR_LIST:
			return {
				...state,
				customerData: [],
			}

		default:
			return state;
	}
};

export default customerReducer;

/**
newCustomerData.push(action.payload);
				for (let i = 0; i <= newCustomerData.length; i++) {
					 id = i + 1;
					 regNum = 1000 + id;
					let recentObject = { ...newCustomerData[i], id, regno: regNum };
					console.log('recentData',recentObject);
					renewedData.push(recentObject)
				}console.log('renewedData', renewedData);

// console.log('state.customerData',state.customerData)

				let id = 0;
				let regNum = 0;
				let customerData = [];
				newcustomerData.map((item, index)=> {
					return(
						 id = index + 1,
						 regNum = 1000 + id,
						 customerData = {...item, id, registration_num : regNum}
					)	
				})


let newName = data.first_name ;
		console.log('newName',newName) 	
		  	
		let number = 1000;
		for(let i=1; i <= olddata.length; i++){
			
			let updatename = newName.substr(0, 3);
				console.log('updatename',updatename);
			number += 1;
			let regno = '';
			regno = newName.concat(number)
			Object.assign(data, {regno});
		}



// let arr = [...state.customerData];
			// const newList = arr.filter((item) => item.first_name != action.payload);
			// arr = newList;


// for( let i = 0; i <= newcustomerData.length; i++){
			// 	const id = previousId + 1;
			// 		console.log('id', id);
			// 	Object.assign(action.payload, {id});
			// 		console.log('action.payload.id',action.payload)
			// }


 */
