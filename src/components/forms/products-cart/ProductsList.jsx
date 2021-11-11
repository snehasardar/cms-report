import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';

import { addToCart } from '../../../actions/product.action';
import '../styles.css'

const ProductsList = (props) => {
	const { bookList } = useSelector((state) => state.booksReducer);
	const { items }= useSelector((state) => state.productReducer);
	const dispatch = useDispatch();
	const [filterdProductList, setFilterdProductList] = useState('');

	const [itemsCountPerPage, setItemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const [totalData, setTotalData] = useState(0);
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;

	let newProduct = []; 

	let updatedProductList = [];

	const handleSubmit = (data) => {
		dispatch(addToCart(data));
		toast.success('Product has been added to your Cart');
	};

	const showBookList = () => {
		setIsLoading(true);
		let i = 0;
		while (i < bookList.length) {
			if (bookList[i].status == 1) {
				let newBookList = bookList[i];
				updatedProductList.push(newBookList);
			}
			i = i + 1;
		}
		setTimeout(() => {
			setIsLoading(false);
			setFilterdProductList(updatedProductList);
			console.log('updatedProductList.length in settime',updatedProductList.length); 
			setTotalData(updatedProductList.length);
			console.log('TotalData in settime',totalData);
		}, 1000);
	};

	useEffect(() => {
		showBookList()
		console.log('booklist',bookList)
		console.log('activePage',activePage)
	},[bookList, activePage])

	useEffect(() => {
		setFilterdProductList(updatedProductList);
		setTotalData(bookList.length);
		console.log('TotalData in useEffect',totalData);
	}, [bookList]);
	

	console.log('isLoading', isLoading);
	return (
		<div className="container">
			<div className="main-content">
				<h5>Shop now </h5>
				<Button variant="link">
					<Link to={`/shop/productsListCart`} >Check Your Cart</Link>
				</Button>
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
												<img src={data.image_link} alt="book image" width="48" height="48"  />
											</td>
											<td>{data.book_name}</td>
											<td >{data.author_name}</td>
											<td>{data.genre}</td>
											<td>{data.total_books}</td>
											<td>₹{data.price}</td>
											{ newProduct = items.map((product) => product.id === data.id)  &&
												newProduct && 
												newProduct.length > 0 ? (
												<td>
													<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
													{newProduct.product_btn}
												</button>
												</td>
											)  : ( 
												<td>
												<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
													{data.product_btn}
												</button>
											</td>
											) }
										</tr>
									);
								})}
						</tbody>
					</Table>
				) : (
						<div>Loading...</div>
					)}
				{totalData > itemsCountPerPage ? (
					<Pagination  
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
