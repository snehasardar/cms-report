import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addToCart } from '../../../actions/product.action';
import { removeItem } from '../../../actions/product.action';
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
	const [cartProduct, setCartProduct] = useState();
	const [updatedProductList, setUpdatedProductList] = useState('');
	const [mobileProductList, setMobileProductList] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	 
		
	const handleSubmit = (data) => {
		
		let newPrd =  items.find((prd) => prd.reference_num === data.reference_num)
		console.log('newPrd', newPrd);
		if(newPrd && Object.keys(newPrd).length > 0){
			//toast.warning('product is already in your Cart');
			dispatch(removeItem(data));
			//console.log('handleSubmit data',data);
			toast.success('Product has been removed from your Cart');
			setCartProduct(items);
			console.log('cartProduct in handleSubmit',cartProduct)
		}else {
			dispatch(addToCart(data));
		toast.success('Product has been added to your Cart');
		setCartProduct(items);
		console.log('cartProduct after add',cartProduct)
		}
	};
	
	const handleSearch = (e) => {
		e.preventDefault();
		const { value } = e.target;
		// console.log('value', value);
		let searchedBookList = [];
		let searchedMobileList = [];
		if (value ) {
			updatedProductList.filter((data) => {
				if (data.book_name.toLowerCase().includes(value.toLowerCase()) || 
					data.author_name.toLowerCase().includes(value.toLowerCase())) {
					searchedBookList.push(data);
				} 
			});
			
			mobileProductList.filter((data) => {
				if (data.mobile_name.toLowerCase().includes(value.toLowerCase()) || 
					data.brand_name.toLowerCase().includes(value.toLowerCase())) {
					searchedMobileList.push(data);
				} 
			});
			setSearchByProducts(value);
			setAllSearchProducts(searchedBookList);
			setAllSearchMobileProducts(searchedMobileList);
			
		} else {
			setFilterdProductList(updatedProductList);
			setFilterdMobileList(mobileProductList);
			setSearchByProducts('');
		}
	}

	const showProductList = () => {
		setIsLoading(true);
		
		let i = 0;
		let checkedBookProducts = [];
		let checkedMobileProducts = [];
		while (i < bookList.length) {
			if (bookList[i].status == 1) {
				let newBookList = bookList[i];
				checkedBookProducts.push(newBookList);
			}
			i = i + 1;
		}
		setUpdatedProductList(checkedBookProducts);
		
		i = 0;
		while (i < mobileList.length) {
			if (mobileList[i].status == 1) {
				let newMobileList = mobileList[i];
				checkedMobileProducts.push(newMobileList);
			}
			i = i + 1;
		}
		setMobileProductList(checkedMobileProducts);

		//setCartProduct(items);
		
		setTimeout(() => {
			setIsLoading(false);
			setFilterdProductList(checkedBookProducts);
			setFilterdMobileList(checkedMobileProducts);
			setCartProduct(items);
			console.log('cartProduct before return', cartProduct)
		}, 1000);
	};

	useEffect(() => {
		showProductList()
	},[bookList])

	useEffect(() => {
		
		setFilterdProductList(updatedProductList);
		setFilterdMobileList(mobileProductList);
			
	}, [bookList]);
	
	console.log('cartProduct before return', cartProduct);
	// console.log('isLoading', isLoading);
	// console.log('filterdMobileList before return',filterdMobileList);
	// console.log('updatedProductList before return',updatedProductList); 
	// console.log('mobileProductList before return',mobileProductList)
	
	return (
		<div className="container">
			<nav className="navbar navbar-light bg-light">
				<div className="fluid">
					<form className="d-flex">
						<a className="navbar-brand" href="#">Shop now</a>
						<input className="form-control me-2" type="search" placeholder="Search by products" name="product_search"
							value={searchByProducts} onChange={(e)=> handleSearch(e)}   />
							
						<button className="btn btn-link" type="button">
							<Link to={`/shop/productsListCart`} >Check Your Cart</Link>
							
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
												{ 	cartProduct &&
													cartProduct.length > 0 &&
														cartProduct.find((item) => item.reference_num === data.reference_num) 

														 ? (
															<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
															Remove from cart
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
												{ 	cartProduct &&
													cartProduct.length > 0 &&
														cartProduct.find((item) => item.reference_num === data.reference_num) 

														 ? (
															<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
															Remove from cart
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
							{console.log('first')}
							</div>

						 ) : (
							
								searchByProducts   &&
								searchByProducts.length > 2  ? (
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
												{ 	cartProduct &&
													cartProduct.length > 0 &&
														cartProduct.find((item) => item.reference_num === data.reference_num) 

														 ? (
															<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
															Remove from cart
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
												{ 	cartProduct &&
													cartProduct.length > 0 &&
														cartProduct.find((item) => item.reference_num === data.reference_num) 

														 ? (
															<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
															Remove from cart
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
								{console.log('second')}
							</Slider>
							</div>

						) : (
							
						<div >
							<div className="clearfix mt-5 mb-2 ">
								<h4>Category: Books</h4>
							</div>
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
													{ 	items &&
													items.length > 0 &&
													items.find((item) => item.reference_num === data.reference_num) 

														 ? (
															<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
															Remove from cart
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
							<div className="clearfix mt-5 mb-2 ">
								<h4>Category: Mobiles</h4>
							</div>
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
													{ 	cartProduct &&
													cartProduct.length > 0 &&
														cartProduct.find((item) => item.reference_num === data.reference_num) 

														 ? (
															<button type="submit" className="btn btn-primary" onClick={() => handleSubmit(data)}>
															Remove from cart
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
									{console.log('third')}
								</Slider>
								{console.log('cartProduct',cartProduct)}	
															
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