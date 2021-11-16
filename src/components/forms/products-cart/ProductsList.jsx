import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
		slidesToShow: 2,
		slidesToScroll: 2
	  };

	const { bookList } = useSelector((state) => state.booksReducer);
	const { items } = useSelector((state) => state.productReducer);
	const { mobileList } = useSelector((state) => state.mobileReducer);
	const dispatch = useDispatch();
	const [filterdProductList, setFilterdProductList] = useState('');
	const [filterdMobileList, setFilterdMobileList] = useState('');
	const [searchByProducts, setSearchByProducts] = useState('')
	const [allSearchProducts, setAllSearchProducts] = useState('')
	const [allSearchMobileProducts, setAllSearchMobileProducts] = useState('')

	const [isLoading, setIsLoading] = useState(false);

	let newProduct = []; 
	let updatedProductList = [];
	let mobileProductList = [];
	let searchedBookList = [];
	let searchedMobileList = [];
	let allProducts = [];
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
				if (data.book_name.toLowerCase().includes(value.toLowerCase()) || 
					data.author_name.toLowerCase().includes(value.toLowerCase())) {
					searchedBookList.push(data);
					console.log('data', data);
				} 
			});
			
			mobileList.filter((data) => {
				if (data.mobile_name.toLowerCase().includes(value.toLowerCase()) || 
					data.brand_name.toLowerCase().includes(value.toLowerCase())) {
					searchedMobileList.push(data);
					console.log('data', data);
					
				} 
			});
			setSearchByProducts(value);
			setAllSearchProducts(searchedBookList);
			console.log('allSearchProducts', allSearchProducts);
			setAllSearchMobileProducts(searchedMobileList);
			console.log('allSearchMobileProducts', allSearchMobileProducts);
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
		allProducts.push(updatedProductList);
		i = 0;
		while (i < mobileList.length) {
			if (mobileList[i].status == 1) {
				let newMobileList = mobileList[i];
				mobileProductList.push(newMobileList);
			}
			i = i + 1;
		}
		console.log('updatedProductList after while', updatedProductList)
		allProducts.push(mobileProductList);
		console.log('allProducts after while', allProducts)
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
	console.log('allSearchProducts before return', allSearchProducts)
	console.log('allSearchMobileProducts before return', allSearchMobileProducts);
	return (
		<div className="container">
			<nav className="navbar navbar-light bg-light">
				<div className="fluid">
					<form className="d-flex">
						<a className="navbar-brand" href="#">Shop now</a>
						<input className="form-control me-2" type="search" placeholder="Search by products" name="product_search"
							value={searchByProducts} onChange={(e)=> handleSearch(e)}   />
							<i className="fas fa-search icon"></i>
						<button className="btn btn-link" type="button">
							<Link to={`/shop/productsListCart`} >Cart</Link>
						</button>
					</form>
				</div>
			</nav>
			{!isLoading ? (
				<div>
					{	
						allSearchProducts.length === 1  ||
						 allSearchMobileProducts.length === 1  ? 
						( 

							<div className="main-content">
							
								{	allSearchProducts  &&
									allSearchProducts.map((data, index) => {
										return (
											<div className="book_card"  key={index}>
												<img src={data.image_link }  alt="book_image" width="200px" height="150px"/>
												<h5>{data.book_name }</h5>
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
									})
								} 
								{	allSearchMobileProducts &&
									allSearchMobileProducts.map((data, index) => {
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
									})
								}
							
							</div>

						 ) : (
							
								allSearchProducts  || allSearchMobileProducts &&
						allSearchProducts.length > 1 || allSearchMobileProducts.length > 1 ? (
							<div className="main-content">
							<Slider {...settings}> 
								{	allSearchProducts  &&
									allSearchProducts.map((data, index) => {
										return (
											<div className="book_card"  key={index}>
												<img src={data.image_link }  alt="book_image" width="200px" height="150px"/>
												<h5>{data.book_name }</h5>
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
									})
								} 
								{	allSearchMobileProducts &&
									allSearchMobileProducts.map((data, index) => {
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
									})
								}
							</Slider>
							</div>

						) : (
							
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
									})
									}
								</Slider>
							</div>
						</div>	
						)
							
						)
						
					}
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


