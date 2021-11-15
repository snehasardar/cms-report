import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';

import { addToCart } from '../../../actions/product.action';
import '../styles.css'
import './productCart.styles.css'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductsList = (props) => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3
	  };

	const { bookList } = useSelector((state) => state.booksReducer);
	const { items } = useSelector((state) => state.productReducer);
	const { mobileList } = useSelector((state) => state.mobileReducer);
	const dispatch = useDispatch();
	const [filterdProductList, setFilterdProductList] = useState('');
	const [filterdMobileList, setFilterdMobileList] = useState('');
	const [searchByProducts, setSearchByProducts] = useState('')

	const [isLoading, setIsLoading] = useState(false);

	let newProduct = []; 
	let updatedProductList = [];
	let mobileProductList = [];
	let searchedList = [];
	const handleSubmit = (data) => {
		dispatch(addToCart(data));
		toast.success('Product has been added to your Cart');
	};
	
	const handleSearch = (e) => {
		e.preventDefault();
		const { value } = e.target;
		console.log('value', value);
		if (value ) {
			bookList.filter((data) => {
				if (data.book_name.toLowerCase().includes(value.toLowerCase())) {
					searchedList.push(data);
					console.log('data', data);
				} else if(data.author_name.toLowerCase().includes(value.toLowerCase())) {
					searchedList.push(data);
					console.log('data', data);
				}
			});
			setSearchByProducts(value);
			setFilterdProductList(searchedList);
		} else if (value ) {
			mobileList.filter((data) => {
				if (data.mobile_name.toLowerCase().includes(searchByProducts.toLowerCase())) {
					searchedList.push(data);
					console.log('data', data);
				} else if (data.brand_name.toLowerCase().includes(searchByProducts.toLowerCase())) {
					searchedList.push(data);
					console.log('data', data);
				}
			});
			setSearchByProducts(value);
			setFilterdMobileList(searchedList);
		} else {
			setFilterdProductList(updatedProductList);
			setFilterdMobileList(mobileProductList);
			setSearchByProducts('');
		}
	}

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
		i = 0;
		while (i < mobileList.length) {
			if (mobileList[i].status == 1) {
				let newMobileList = mobileList[i];
				mobileProductList.push(newMobileList);
			}
			i = i + 1;
		}
		console.log('updatedProductList after while', updatedProductList)
		setTimeout(() => {
			setIsLoading(false);
			setFilterdProductList(updatedProductList);
			setFilterdMobileList(mobileProductList);
			console.log('filterdMobileList in settime',filterdMobileList);
			console.log('updatedProductList.length in settime',updatedProductList.length); 
			console.log('updatedProductList in settime',updatedProductList); 
			
		}, 1000);
	};

	useEffect(() => {
		showBookList()
		console.log('booklist',bookList)
		
	},[bookList])

	useEffect(() => {
		setFilterdProductList(updatedProductList);
	}, [bookList]);
	
	console.log('isLoading', isLoading);
	return (
		<div className="container">
			<nav className="navbar navbar-light bg-light">
				<div className="fluid">
					<form className="d-flex">
					<input className="form-control me-2" type="search" placeholder="Search by products" 
						value={searchByProducts} onchange={handleSearch}   />
						<i className="fas fa-search icon"></i>
					</form>
				</div>
			</nav>
				{!isLoading ? (
					<div>
						<h4>Category: Books</h4>
					<div className="main-content">
						<Slider {...settings}>
							{filterdProductList &&
								filterdProductList.length > 0 &&
								filterdProductList.map((data, index) => {
									return (
										<div className="book_card"  key={index}>
											<img src={data.image_link}  alt="book_image" width="200px" height="150px"/>
											<h5>{data.book_name}</h5>
											<h6>{data.author_name}, {data.genre}, {data.total_books} pieces </h6>
											<h5>₹{data.price} </h5>
											{ newProduct = items.map((product) => product.id === data.id)  &&
												newProduct && 
												newProduct.length > 0 ? (
													<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
													{newProduct.product_btn}
												</button>
											)  : ( 
												<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
													{data.product_btn}
												</button>
											) }
										</div>
									);
							})}
						</Slider>
					</div>
					<h4>Category: Mobiles</h4>
					<div className="main-content">
						<Slider {...settings}>
							{filterdMobileList &&
								filterdMobileList.length > 0 &&
								filterdMobileList.map((data, index) => {
									return (
										<div className="book_card"  key={index}>
											<img src={data.mobile_image}  alt="mobile_image" width="150px" height="150px"/>
											<h5>{data.mobile_name}</h5>
											<h6>{data.brand_name}, {data.ram} ram, {data.storage} storage, {data.battery} battery </h6>
											<h5>₹{data.price} </h5>
											{ newProduct = items.map((product) => product.id === data.id)  &&
												newProduct && 
												newProduct.length > 0 ? (
													<button type="submit" className="btn btn-primary " onClick={() => handleSubmit(data)}>
													{newProduct.product_btn}
												</button>
											)  : ( 
												<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
													{data.product_btn}
												</button>
											) }
										</div>
									);
							})}
						</Slider>

						
					</div>
				</div>
				) : (
						<div>Loading...</div>
					)}
			
		</div>
	);
};
export default ProductsList;



/*
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
				)} */


