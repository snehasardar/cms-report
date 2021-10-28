import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS, EDIT_BOOKS } from '../action-types/action.types';

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
				let newBookList = {
					...action.payload,
					id,
					reference_num: regNum,
				};
				allBookList.push(newBookList);
			} else {
				let id = 1;
				let subtringName = action.payload.book_name.substring(0, 4);
				let regNum = subtringName + 1000 + id;
				let newBookList = { ...action.payload, id, reference_num: regNum };
				allBookList.push(newBookList);
			}
			return {
				...state,
				bookList: allBookList,
			};

		case DELETE_BOOKS:
			const newBookList = state.bookList.filter((item) => item.id !== action.payload);
			console.log(' newBookList', newBookList);
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
			console.log(' existingBook', existingBook);
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
