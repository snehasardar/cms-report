import { ADD_BOOKS, DELETE_BOOKS, CLEAR_BOOKS } from '../action-types/action.types';

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
                let newBookList = {
                    ...action.payload,
                    id,
                };
                allBookList.push(newBookList);
            } else {
                let id = 1;
                let newBookList = { ...action.payload, id };
                allBookList.push(newBookList);
            }
            return {
                ...state,
                bookList: allBookList,
            };

		case DELETE_BOOKS:
			const newBookList = state.bookList.filter((item) => item.id != action.payload);
			console.log(' newBookList',newBookList);
			return {
				...state,
				bookList: newBookList,
			};
        case CLEAR_BOOKS:
            return {
                ...state,
                bookList: [],
            }

		default:
			return state;
	}
};

export default booksCart;