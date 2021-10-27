import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS, EDIT_BOOKS, SEARCH_BOOKS } from '../action-types/action.types';

const initialStates = {
	bookList: [],
};

const booksCart = (state = initialStates, action) => {
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
			const newBookList = state.bookList.filter((item) => item.id != action.payload);
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

export default booksCart;

// case SEARCH_BOOKS:
//     let searchedBook = action.payload;
//     console.log('searchedBook',searchedBook);
//     const filteredBook = state.bookList.filter((data) => {
//         return data.author_name.toLowerCase().includes(searchedBook.toLowerCase()) &&
//         data.book_name.toLowerCase().includes(searchedBook.toLowerCase())
//     });
//     console.log('filteredBook',filteredBook);

//      return {
//         ...state,
//         bookList: filteredBook,
//         };
