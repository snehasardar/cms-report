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
                // let needToadd = allAddedItems.find((data) => data.id == addValue.id);
                // if(needToadd ){
                //     needToadd.quantity = needToadd.quantity + 1;
                //     console.log('needToadd.quantity',needToadd.quantity);
                // }else{
                    let qnt = 1;
                    addValue.product_btn = "Remove from Cart";
                    let newValue = { ...addValue, quantity: qnt };
                    allAddedItems.push(newValue);
                // }
            } else {
                let qnt = 1;
                addValue.product_btn = "Remove from Cart";
                let newValue = { ...addValue, quantity: qnt };
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
                needtoAdd.product_btn = "Add to Cart";
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
            console.log('allAddItems in remove reducer',allAddItems);
            let clearPrd = action.payload
            console.log(' remove clearPrd ', clearPrd);
            let needToAdd = allAddItems.filter((data) => data.reference_num !== action.payload.reference_num);
            allAddItems = needToAdd;
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
