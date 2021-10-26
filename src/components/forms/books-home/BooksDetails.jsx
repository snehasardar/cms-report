import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../customer-home/Sidebar';

import { deleteBook, clearBook } from '../../../actions/books.action';

import '../customer-home/customerModal.styles.css'

const BooksDetails = (props) => {
	const { bookModal, setBookModal } = props;
	console.log('setBookModal',setBookModal);
	const { bookList } = useSelector((state) => state.booksCart);
	console.log('bookList', bookList);
	const dispatch = useDispatch();
	const history = useHistory();
	const [searchItem, setSearchItem] = useState('');
	

	const handleSearch = (e) => {
		setSearchItem(e.target.value)
	};

	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Books list </h5>
				<button onClick={() => setBookModal(true)}><Link to={'/booksAdd'}>Add Books</Link></button>{' '}
				<input placeholder="Search by Book Name" onChange={ handleSearch } />{' '}
				<input placeholder="Search by Author Name" onChange={ handleSearch } />{' '}
				<button onClick={() => dispatch(clearBook())}>Clear BooksList</button>
				<table className="table">
					<thead>
						<tr>
							<th> </th>
							<th>Id</th>
							<th>Book Name</th>
							<th>Author Name</th>
							<th>Language</th>
							<th>Total Books</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{bookList &&
							bookList
								.filter((data) => {
									if (searchItem === '') {
										return data;
									} else if (data.book_name.toLowerCase().includes(searchItem.toLowerCase())) {
										return data;
									} else if (data.author_name.toLowerCase().includes(searchItem.toLowerCase())) {
										// console.log('data of email',data.email)
										return data;
									}
								})
								.map((data, index) => {
									return (
										<tr key={index}>
											<td><img src={"https://img.icons8.com/color/48/000000/story-book.png"} width="50" height="50"  /> </td>
											<td>{data.id}</td>
											<td>{data.book_name}</td>
											<td>{data.author_name}</td>
											<td>{data.language}</td>
											<td>{data.no_of_books}</td>
											<td>₹{data.price}</td>
											<td>
												<button onClick={() => dispatch(deleteBook(data.id))}>Delete</button>
											</td>
										</tr>
									);
								})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default BooksDetails;

/* <Link to={'/detail/'+'d.id'}>edit</Link> 
"https://img.icons8.com/flat-round/64/000000/book.png"*/
/* <td>{index + 1}</td> */
