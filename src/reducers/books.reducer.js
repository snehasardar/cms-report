import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS, EDIT_BOOKS, ADDALL_DATA } from '../action-types/action.types';

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

		case ADDALL_DATA:
			let oldData = [...state.bookList];
			let localValue = action.payload; 
				console.log('localValue',localValue);
			const totalData = oldData.length;
			for(let i=0; i < localValue.length; i++){
				if (totalData > 0) {
					let id = oldData[totalData - 1].id + 1; 
					let newValue = {
						...localValue[i],id,};
					oldData.push(newValue);
					console.log('newValue',newValue)
				} else {
					let id = 0;
					id = id + 1;
					let newValue = {
						...localValue[i],id,};
					oldData.push(newValue);
						console.log('newValue',newValue)
				}
			} 
				console.log('oldData',oldData);
			return {
				bookList: oldData,
			};

		case DELETE_BOOKS:
			let freshBookList = [...state.bookList];
			let newBookList = freshBookList.filter((item) => item.id !== action.payload);
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
