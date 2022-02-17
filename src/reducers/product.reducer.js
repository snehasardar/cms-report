import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, CLEAR_CART } from '../action-types/action.types';

const initialStates = {
	items: [],
};

const productReducer = (state = initialStates, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			let allAddedItems = [...state.items];
			let addValue = action.payload;
			if (allAddedItems.length > 0) {
				let qnt = 1;
				let newValue = { ...addValue, quantity: qnt };
				allAddedItems.push(newValue);
			} else {
				let qnt = 1;
				let newValue = { ...addValue, quantity: qnt };
				allAddedItems.push(newValue);
			}
			return {
				...state,
				items: allAddedItems,
			};

		case ADD_QUANTITY:
			let allItems = [...state.items];
			let needToadd = allItems.find((data) => data.id == action.payload);
			needToadd.quantity += 1;
			return {
				...state,
				items: allItems,
			};

		case SUB_QUANTITY:
			let allAddeditems = [...state.items];
			let needtoAdd = allAddeditems.find((data) => data.id == action.payload);
			if (needtoAdd.quantity >= 0) {
				needtoAdd.quantity = needtoAdd.quantity - 1;
			}
			if (needtoAdd.quantity == 0) {
				let clearPrd = allAddeditems.filter((data) => data.id != action.payload);
				allAddeditems = clearPrd;
			}

			return {
				...state,
				items: allAddeditems,
			};

		case REMOVE_ITEM:
			let allAddItems = [...state.items];
			let needToAdd = allAddItems.filter((data) => data.reference_num !== action.payload.reference_num);
			allAddItems = needToAdd;
			return {
				...state,
				items: allAddItems,
			};

		case CLEAR_CART:
			return {
				...state,
				items: [],
			};

		default:
			return state;
	}
};

export default productReducer;
