import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';

import { addToCart } from '../../../actions/product.action';

const ProductsList = (props) => {
	const { bookList } = useSelector((state) => state.booksReducer);
	// const { items }= useSelector((state) => state.productReducer);
	const dispatch = useDispatch();
	const [filterdProductList, setFilterdProductList] = useState('');

	const [itemsCountPerPage, setItemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const [totalData, setTotalData] = useState(bookList.length);
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;

	let updatedProductList = [];
	

	const handleSubmit = (data) => {
		dispatch(addToCart(data));
		toast.success('Product has been added to your Cart');
	};

	const showBookList = (start, end) => {
		setIsLoading(true);
		let i = 0;
		while (i < bookList.length) {
			if (bookList[i].status == 1) {
				let newBookList = bookList[i];
				updatedProductList.push(newBookList);
			}
			i = i + 1;
		}
		setTotalData(updatedProductList.length);
		setTimeout(() => {
			setIsLoading(false);
			setFilterdProductList(updatedProductList);
		}, 1000);
	};

	useEffect(() => {
		setFilterdProductList(updatedProductList);
	}, [bookList]);
	

	useEffect(() => {
		showBookList(firstData, lastData);
		console.log('activepage', activePage);
	}, [activePage]);

	console.log('isLoading', isLoading);
	return (
		<div className="container">
			<div>
				<h5>Shop now </h5>
				<button>
					<Link to={`/shop/productsListCart`}>Check Your Cart</Link>
				</button>
				{!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Image</th>
								<th>Book Name</th>
								<th>Author Name</th>
								<th>Genre</th>
								<th>Stock </th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{filterdProductList &&
								filterdProductList.length > 0 &&
								filterdProductList.slice(firstData, lastData).map((data, index) => {
									return (
										<tr key={index}>
											<td>
												<img src={data.image_link} alt="book image" width="50" height="50" />{' '}
											</td>
											<td>{data.book_name}</td>
											<td>{data.author_name}</td>
											<td>{data.genre}</td>
											<td>{data.total_books}</td>
											<td>₹{data.price}</td>
											<td>
												<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
													{data.product_btn}
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
				{updatedProductList.length >= itemsCountPerPage ? (
					<Pagination
						linkClass="page-link"
						linkClass="page-link"
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
export default ProductsList;
