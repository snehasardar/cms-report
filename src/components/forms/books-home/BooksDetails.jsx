import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../customer-home/Sidebar';
import Pagination from 'react-js-pagination';

import dateFormat from 'dateformat';
import { deleteBook, clearBook } from '../../../actions/books.action';

import '../customer-home/customerModal.styles.css';

const BooksDetails = (props) => {
	const { bookModal, setBookModal, bookEditModal, setBookEditModal } = props;
	const { bookList } = useSelector((state) => state.booksReducer);
	const dispatch = useDispatch();
	// const history = useHistory();
	const [searchByName, setSearchByName] = useState('');
	const [filterdBookList, setFilterdBookList] =useState('');

	const [posts, setPosts] = useState([]);
	const [itemsCountPerPage, setItemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const totalData = bookList.length;
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;
	let currentData = filterdBookList.slice(firstData, lastData);
	console.log('index of lastData', lastData);
	console.log('index of firstData', firstData);
	console.log('currentData', currentData);

	const handleSearchByName = (e) => {
		setSearchByName(e.target.value);
		console.log('handleSearchByName ', searchByName);
		
		// if( e.target.value ){
		// 	posts.filter((data) => {
		// 		if (data.book_name.toLowerCase().includes(searchByName.toLowerCase())) {
		// 			setFilterdBookList(data);
		// 		} else if (data.author_name.toLowerCase().includes(searchByName.toLowerCase())) {
		// 			setFilterdBookList(data);
		// 		} else if (
		// 			data.author_name.toLowerCase().includes(searchByName.toLowerCase()) &&
		// 			data.book_name.toLowerCase().includes(searchByName.toLowerCase())
		// 		) {
		// 			setFilterdBookList(data);
		// 		}
		// 	})
		// }else{
		// 	setFilterdBookList(bookList)
		// }
	};

	const showBookList = (start, end) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setFilterdBookList(bookList);
			setPosts(bookList);
		}, 1000);
	};

	useEffect(() => {
		showBookList(firstData, lastData);
		console.log('activepage', activePage);
	}, [activePage]);

	console.log('isLoading', isLoading);
	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Books list </h5>
				<button onClick={() => setBookModal(true)}>
					<Link to={'/booksAdd'}>Add Books</Link>
				</button>{' '}
				<input placeholder="Search by Book Name" onChange={handleSearchByName} />{' '}
				<input placeholder="Search by Author Name" onChange={handleSearchByName} />{' '}
				<button onClick={() => dispatch(clearBook())}>Clear BooksList</button>
				{console.log('currentData return', currentData)}
				{!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Image</th>
								<th>ID</th>
								<th>Book Name</th>
								<th>Author Name</th>
								<th>Genre</th>
								<th>Reference Number</th>
								<th>Stock </th>
								<th>Price</th>
								<th>Added date</th>
								<th>Updated Date</th>
								<th>Status</th>
								<th colSpan="2">Action</th>
							</tr>
						</thead>
						<tbody>
							{currentData &&
								currentData.filter((data) => {
									if (data.book_name.toLowerCase().includes(searchByName.toLowerCase())) {
										return data;
									} else if (data.author_name.toLowerCase().includes(searchByName.toLowerCase())) {
										return data;
									} else if (
										data.author_name.toLowerCase().includes(searchByName.toLowerCase()) &&
										data.book_name.toLowerCase().includes(searchByName.toLowerCase())
									) {
										return data;
									}
								})
								.map((data, index) => {
										return (
											<tr key={index}>
												<td>
													<img src={data.image_link} alt="books image" width="50" height="50" />{' '}
												</td>
												<td>{data.id}</td>
												<td>{data.book_name}</td>
												<td>{data.author_name}</td>
												<td>{data.genre}</td>
												<td>{data.reference_num}</td>
												<td>{data.total_books}</td>
												<td>₹{data.price}</td>
												<td>{dateFormat((data.added_date), 'dd-mm-yyyy hh:MM TT')}</td>
												<td>{dateFormat((data.updated_date), 'dd-mm-yyyy hh:MM TT')}</td>
												<td>{data.status}</td>
												<td>
													<button onClick={() => dispatch(deleteBook(data.id))}>Delete</button>
												</td>
												<td>
													<button onClick={() => setBookEditModal(true)}>
														<Link to={`/booksEdit/${data.id}`}>Edit</Link>
													</button>
												</td>
											</tr>
										);
									})}
						</tbody>
					</Table>
				) : (
					<div>Loading...</div>
				)}
				{
					(bookList >= 5) ? (
						<Pagination
						activePage={activePage}
						itemsCountPerPage={itemsCountPerPage}
						totalItemsCount={totalData}
						pageRangeDisplayed={pageRangeDisplayed}
						onChange={(currentPage) => setActivePage(currentPage)}/>
					) : ( ' ' )
				}
				
			</div>
		</div>
	);
};
export default BooksDetails;
