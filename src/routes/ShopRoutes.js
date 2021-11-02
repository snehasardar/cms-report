import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, withRouter, Redirect } from 'react-router-dom';



/** Public Routes */
import PublicRoute from './PublicRoute';


// import Navbar from '../components/forms/Navbar';

import ProductsList from '../components/forms/products-cart/ProductsList';
import ProductsListCart from '../components/forms/products-cart/ProductsListCart';

const ShopRoutes = () => {

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<BrowserRouter>
			{/* <Navbar  /> */}
			<Switch>
				
				<PublicRoute exact path="/shop" component={ProductsList}  />
				<PublicRoute exact path="/shop/productsListCart" component={ProductsListCart} />
				
			</Switch>
		</BrowserRouter>
	);
};

export default withRouter(ShopRoutes); //withRouter HOC will let us use props for location and history
