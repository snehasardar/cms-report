import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, CLEAR_CART } from '../action-types/action.types';

const initialStates = {
	items: [],
};



const productReducer = (state = initialStates, action) => {
	switch (action.type) {
		case ADD_TO_CART:
            let allAddedItems = [...state.items];
                console.log('allAddedItems',allAddedItems);
            let addValue = action.payload; 
				console.log('addValue',addValue);
            if (allAddedItems.length > 0) {
                let needToadd = allAddedItems.find((data) => data.id == addValue.id);
                console.log('needToadd', needToadd);
                if(needToadd ){
                    needToadd.quantity = needToadd.quantity + 1;
                    console.log('needToadd.quantity',needToadd.quantity);
                    // allAddedItems.push(needToadd);
                }else{
                    let qnt = 1;
                    let newValue = { ...action.payload, quantity: qnt };
                    allAddedItems.push(newValue);
                }
            } else {
                let qnt = 1;
                let newValue = { ...action.payload, quantity: qnt };
                allAddedItems.push(newValue);
            }
                console.log('allAddedItems ',allAddedItems);   
			return {
		        ...state,
		        items: allAddedItems,
	        }

		case ADD_QUANTITY:
            let allItems = [...state.items];
            console.log('allItems',allItems);
            let needToadd = allItems.find((data) => data.id == action.payload);
            console.log('needToadd', needToadd);
            needToadd.quantity += 1;
            console.log(' add allItems ', allItems);
            console.log('add needToadd', needToadd);
            return {
                ...state,
                items: allItems,
            };
			

		case SUB_QUANTITY:
			let allAddeditems = [...state.items];
            console.log('allAddeditems',allAddeditems);
            let needtoAdd = allAddeditems.find((data) => data.id == action.payload);
            if (needtoAdd.quantity >= 0) {
                needtoAdd.quantity = needtoAdd.quantity - 1;
            }
            if (needtoAdd.quantity == 0) {
                let clearPrd = allAddeditems.filter((data) => data.id != action.payload);
                allAddeditems = clearPrd;
                console.log('clearprd', clearPrd);
            }

            console.log('subtract needtoAdd', needtoAdd);
            console.log(' subtract allAddeditems ',allAddeditems);

            return {
                ...state,
                items: allAddeditems,
            };

		case REMOVE_ITEM:
			let allAddItems = [...state.items];
            console.log('allAddItems',allAddItems);
            let clearPrd = allAddItems.find((data) => data.id == action.payload);
            clearPrd.quantity = 0;
            let needToAdd = allAddItems.filter((data) => data.id != action.payload);
            allAddItems = needToAdd;
            console.log(' remove clearPrd ', clearPrd);
            console.log(' remove allAddItems ', allAddItems);
            console.log('remove needToadd', needToAdd);
            return {
                ...state,
                items: allAddItems,
            };

		case CLEAR_CART:
			return{
                ...state,
                items: []
            }

		default:
			return state;
	}
};

export default productReducer;
