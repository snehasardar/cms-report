import { ADD_MOBILE, EDIT_MOBILE, DELETE_MOBILE, CLEAR_MOBILES, AUTOFILL_MOBILES  } from '../action-types/action.types';

const initialStates = {
	mobileList: [],
};

const mobileReducer = (state = initialStates, action) => {
	switch (action.type) {
		case ADD_MOBILE:
			let allMobileList = [...state.mobileList];
			const totalMobiles = allMobileList.length;
			if (totalMobiles > 0) {
				let id = allMobileList[totalMobiles - 1].id + 1;
				let subtrName = action.payload.mobile_name.substring(0, 4);
				let regNum = subtrName  + 1000 + id;
				let prd_btn = "Add to Cart";
				let newMobileList = {
					...action.payload,
					id,
					reference_num: regNum,
					product_btn : prd_btn
				};
				console.log('newMobileList',newMobileList)
				allMobileList.push(newMobileList);
			} else {
				let id = 1;
				let subtrName = action.payload.mobile_name.substring(0, 4);
				let regNum = subtrName + 1000 + id;
				let prd_btn = "Add to Cart";
				let newMobileList = { ...action.payload, id, reference_num: regNum, product_btn : prd_btn };
				console.log('newMobileList',newMobileList)
				allMobileList.push(newMobileList);
			}
			return {
				...state,
				mobileList: allMobileList,
			};

		case AUTOFILL_MOBILES:
			let oldMobileList = [...state.mobileList];
			let localData = action.payload; 
				console.log('localData',localData);
			let id = 0;
			for(let i=0; i < localData.length; i++){
				if (oldMobileList.length > 0) {
					id = oldMobileList[oldMobileList.length - 1].id + 1; 
					let newData = {
						...localData[i], id
					};
					oldMobileList.push(newData);
					console.log('newData',newData)
				} else {
					id = id + 1;
					let newData = {
						...localData[i], id};
					oldMobileList.push(newData);
						console.log('newData',newData)
				}
			} 
				console.log('oldMobileList',oldMobileList);
			return {
				...state,
				mobileList: oldMobileList,
			};

		case DELETE_MOBILE:
			let oldList = [...state.mobileList];
			let newList = oldList.filter((item) => item.id !== action.payload);
			console.log(' newList', newList);
			return {
				...state,
				mobileList: newList,
			};

		case EDIT_MOBILE:
			let existingMobiles = [...state.mobileList];
			let updatedMobiles = existingMobiles.map((item) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						...action.payload,
					};
				}
				return item;
			});
			console.log('existingMobiles', existingMobiles);
			return {
				...state,
				mobileList: updatedMobiles,
			};

		case CLEAR_MOBILES:
			return {
				...state,
				mobileList: [],
			};

		default:
			return state;
	}
};

export default mobileReducer;
