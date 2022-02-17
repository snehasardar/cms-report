import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS, EDIT_BOOKS, ADDAUTOFILL_DATA } from '../action-types/action.types';

const initialStates = {
	bookList: [],
};

const booksReducer = (state = initialStates, action) => {
	switch (action.type) {
		case ADD_BOOKS:
			let allBookList = [...state.bookList];
			const totalBooks = allBookList.length;
			if (totalBooks > 0) {
				let id = allBookList[totalBooks - 1].id + 1;
				let subtringName = action.payload.book_name.substring(0, 4);
				let regNum = subtringName + 1000 + id;
				let prd_btn = "Add to Cart";
				let newBookList = {
					...action.payload,
					id,
					reference_num: regNum,
					product_btn : prd_btn
				};
				allBookList.push(newBookList);
			} else {
				let id = 1;
				let subtringName = action.payload.book_name.substring(0, 4);
				let regNum = subtringName + 1000 + id;
				let prd_btn = "Add to Cart";
				let newBookList = { ...action.payload, id, reference_num: regNum, product_btn : prd_btn };
				allBookList.push(newBookList);
			}
			return {
				...state,
				bookList: allBookList,
			};

		case ADDAUTOFILL_DATA:
			let oldBookData = [...state.bookList];
			let localValue = action.payload; 
			// const totalData = oldData.length;
			let id = 0;
			// let prd_btn = '';
			for(let i=0; i < localValue.length; i++){
				if (oldBookData.length > 0) {
					id = oldBookData[oldBookData.length - 1].id + 1; 
					let newValue = {
						...localValue[i], id
					};
					oldBookData.push(newValue);
				} else {
					id = id + 1;
					let newValue = {
						...localValue[i], id};
					oldBookData.push(newValue);
				}
			} 
			return {
				bookList: oldBookData,
			};

		case DELETE_BOOKS:
			let freshBookList = [...state.bookList];
			let newBookList = freshBookList.filter((item) => item.id !== action.payload);
			return {
				...state,
				bookList: newBookList,
			};

		case EDIT_BOOKS:
			let existingBook = [...state.bookList];
			let updatedBook = existingBook.map((item) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						...action.payload,
					};
				}
				return item;
			});
			return {
				...state,
				bookList: updatedBook,
			};

		case CLEAR_BOOKS:
			return {
				...state,
				bookList: [],
			};

		default:
			return state;
	}
};

export default booksReducer;
