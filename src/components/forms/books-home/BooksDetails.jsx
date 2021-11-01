import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../customer-home/Sidebar';
import Pagination from 'react-js-pagination';

import dateFormat from 'dateformat';
import { deleteBook, clearBook, addAllData } from '../../../actions/books.action';

import '../customer-home/customerModal.styles.css';
import { toast } from 'react-toastify';

import books from './books.json'
import allBooksDtails from './books.json';

const BooksDetails = (props) => {
	const { bookModal, setBookModal, bookEditModal, setBookEditModal } = props;
	const { bookList } = useSelector((state) => state.booksReducer);
	const dispatch = useDispatch();
	const [searchByName, setSearchByName] = useState('');
	const [searchByAuthor, setSearchByAuthor] = useState('');
	const [filterdBookList, setFilterdBookList] = useState('');

	const [itemsCountPerPage, setItemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const totalData = bookList.length;
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;


	const handleSearchByName = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log('name ', name);
		console.log('value', value);
		if (value && name === 'name_search') {
			let newData = [];
			bookList.filter((data) => {
				if (data.book_name.toLowerCase().includes(value.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setSearchByName(value);
			setFilterdBookList(newData);
		} else if (value && name === 'email_search') {
			let newData = [];
			bookList.filter((data) => {
				if (data.author_name.toLowerCase().includes(searchByAuthor.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				} else if (
					data.book_name.toLowerCase().includes(searchByName.toLowerCase()) &&
					data.author_name.toLowerCase().includes(searchByAuthor.toLowerCase())
				) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setFilterdBookList(newData);
		} else {
			setFilterdBookList(bookList);
			setSearchByName('');
			setSearchByAuthor('');
		}
	};

	const handleAddAutoData = () => {
		console.log('data', books);
		console.log('allBooksDtails', allBooksDtails);
		books.allBooksDtails.map(item => {
			return(
				console.log(item)
			)
			
		});
		dispatch(addAllData( books.allBooksDtails));
	}

	const handleDelete = (id) => {
		dispatch(deleteBook(id));
		toast.success('Book has been successfully deleted')
	}

	const showBookList = (start, end) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setFilterdBookList(bookList);
		}, 1000);
	};

	useEffect(() => {
		setFilterdBookList(bookList);
	}, [bookList]);


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
				<input placeholder="Search by Book Name" name="name_search" value={searchByName} onChange={handleSearchByName} />{' '}
				<input placeholder="Search by Author Name" name="email_search" value={searchByAuthor} onChange={handleSearchByName} />{' '}
				<button onClick={() => dispatch(clearBook())}>Clear BooksList</button>{' '}
				<button onClick={ handleAddAutoData }>Autofill</button>
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
							{filterdBookList &&
								filterdBookList.length > 0 &&
								filterdBookList.slice(firstData, lastData).map((data, index) => {
									return (
										<tr key={index}>
											<td>
												<img src={data.image_link} alt="book image" width="50" height="50" />{' '}
											</td>
											<td>{data.id}</td>
											<td>{data.book_name}</td>
											<td>{data.author_name}</td>
											<td>{data.genre}</td>
											<td>{data.reference_num}</td>
											<td>{data.total_books}</td>
											<td>₹{data.price}</td>
											<td>{dateFormat(data.added_date, 'dd-mm-yyyy hh:MM TT')}</td>
											<td>{dateFormat(data.updated_date, 'dd-mm-yyyy hh:MM TT')}</td>
											<td>{data.status}</td>
											<td>
											<button onClick={(e) => handleDelete(data.id)}>Delete</button>
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
				{bookList.length >= itemsCountPerPage ? (
					<Pagination linkClass="page-link" linkClass="page-link"
						activePage={activePage}
						itemsCountPerPage={itemsCountPerPage}
						totalItemsCount={totalData}
						pageRangeDisplayed={pageRangeDisplayed}
						onChange={(currentPage) => setActivePage(currentPage)}
					/>
				) : (
					' '
				)}
			</div>
		</div>
	);
};
export default BooksDetails;

/*
const handleSearchByName = (e) => {
		e.preventDefault();
		setSearchByName(e.target.value);
		console.log('handleSearchByName ', searchByName);
		console.log('filterdBookList', filterdBookList);
		if (e.target.value) {
			let newData = [];
			bookList.filter((data) => {
				if (data.book_name.toLowerCase().includes(searchByName.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				} else if (data.author_name.toLowerCase().includes(searchByName.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				} else if (
					data.author_name.toLowerCase().includes(searchByName.toLowerCase()) &&
					data.book_name.toLowerCase().includes(searchByName.toLowerCase())
				) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setFilterdBookList(newData);
		} else {
			setFilterdBookList(bookList);
		}
	};

 */
