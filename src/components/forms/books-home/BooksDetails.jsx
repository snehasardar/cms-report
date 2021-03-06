import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../customer-home/Sidebar';
import Pagination from 'react-js-pagination';

import dateFormat from 'dateformat';
import { deleteBook, clearBook, addAutoAllData } from '../../../actions/books.action';

import '../customer-home/customerModal.styles.css';
import '../styles.css';

import { toast } from 'react-toastify';

import books from './books.json';

const BooksDetails = (props) => {
	const { setBookModal, setBookEditModal } = props;
	const { bookList } = useSelector((state) => state.booksReducer);
	const dispatch = useDispatch();
	const [searchByName, setSearchByName] = useState('');
	const [searchByAuthor, setSearchByAuthor] = useState('');
	const [filterdBookList, setFilterdBookList] = useState('');
	const [serachedBookList, setSerachedBookList] = useState();

	const [itemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const [totalBookData, setTotalBookData] = useState(0);
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;

	const handleSearchByName = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let newDataList = [];
		if (value && name === 'name_search') {
			bookList.filter((data) => {
				if (data.book_name.toLowerCase().includes(value.toLowerCase())) {
					newDataList.push(data);
				}
			});
			setSearchByName(value);
			setFilterdBookList(newDataList);
			setTotalBookData(newDataList.length);
			setSerachedBookList(newDataList);
			// console.log('serachedBookList in handle search', serachedBookList);
			setActivePage(1);
		} else if (value && name === 'author_search') {
			bookList.filter((data) => {
				if (data.author_name.toLowerCase().includes(searchByAuthor.toLowerCase())) {
					newDataList.push(data);
				} else if (
					data.book_name.toLowerCase().includes(searchByName.toLowerCase()) &&
					data.author_name.toLowerCase().includes(searchByAuthor.toLowerCase())
				) {
					newDataList.push(data);
				}
			});
			setSearchByAuthor(value);
			setFilterdBookList(newDataList);
			setTotalBookData(newDataList.length);
			setSerachedBookList(newDataList);
			setActivePage(1);
		} else {
			setFilterdBookList(bookList);
			setTotalBookData(bookList.length);
			setSearchByName('');
			setSearchByAuthor('');
		}
	};

	const handleAddAutoData = () => {
		books.allBooksDtails.map((item) => {
			return item;
			// return console.log(item);
		});
		dispatch(addAutoAllData(books.allBooksDtails));
	};

	const handleDelete = (id) => {
		dispatch(deleteBook(id));
		toast.success('Book has been successfully deleted');
	};

	const showBookList = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			if (searchByName) {
				setFilterdBookList(serachedBookList);
				setTotalBookData(serachedBookList.length);
			} else if (searchByAuthor) {
				setFilterdBookList(serachedBookList);
				setTotalBookData(serachedBookList.length);
			} else {
				setFilterdBookList(bookList);
				setTotalBookData(bookList.length);
			}
		}, 1000);
	};

	useEffect(() => {
		setFilterdBookList(bookList);
		setTotalBookData(bookList.length);
	}, [bookList]);

	useEffect(() => {
		showBookList();
		// console.log('activepage', activePage);
	}, [activePage]);

	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Books list </h5>

				<div className=" gap-2 flex ">
					<button type="button" className="btn btn-outline-secondary top-button" onClick={() => setBookModal(true)}>
						<Link to={'/booksAdd'}>Add Books</Link>
					</button>{' '}
					<input type="input" placeholder="Search by Book Name" name="name_search" value={searchByName} onChange={handleSearchByName} />{' '}
					<input placeholder="Search by Author Name" name="author_search" value={searchByAuthor} onChange={handleSearchByName} />{' '}
					<button type="button" className="btn btn-secondary top-button" onClick={() => dispatch(clearBook())}>
						Clear BooksList
					</button>{' '}
					<button type="button" className="btn btn-secondary top-button" onClick={handleAddAutoData}>
						Autofill
					</button>
				</div>
				<p className="text-end fs-5" style={{ padding: '10px' }}>
					Total Books : {filterdBookList.length}
				</p>

				{!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Image</th>
								<th>Book Name</th>
								<th>Author Name</th>
								<th>Genre</th>
								<th>Reference Number</th>
								<th>Stock </th>
								<th>Price</th>
								<th>Added date</th>
								<th>Updated Date</th>
								<th>Status</th>
								<th> Action </th>
							</tr>
						</thead>
						<tbody>
							{filterdBookList &&
								filterdBookList.length > 0 &&
								filterdBookList.slice(firstData, lastData).map((data, index) => {
									return (
										<tr key={index}>
											<td>
												<img src={data.image_link} alt="book" width="50" height="50" />{' '}
											</td>
											<td>{data.book_name}</td>
											<td>{data.author_name}</td>
											<td>{data.genre}</td>
											<td>{data.reference_num}</td>
											<td>{data.total_books}</td>
											<td>???{data.price}</td>
											<td>{dateFormat(data.added_date, 'dd-mm-yyyy hh:MM TT')}</td>
											<td>{dateFormat(data.updated_date, 'dd-mm-yyyy hh:MM TT')}</td>
											<td>{data.status}</td>
											<td>
												<button type="button" className="btn btn-success" onClick={(e) => handleDelete(data.id)}>Delete</button>

												<button type="button" className="btn btn-outline-secondary " onClick={() => setBookEditModal(true)}>
													<Link to={`/booksEdit/${data.id}`}>Edit</Link>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				) : (
					<div className="text-center">
						<button className="btn btn-light text-dark" type="button" disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							Loading...
						</button>
					</div>
				)}
				{totalBookData >= itemsCountPerPage ? (
					<Pagination
						activePage={activePage}
						itemsCountPerPage={itemsCountPerPage}
						totalItemsCount={totalBookData}
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