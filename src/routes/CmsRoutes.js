import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, withRouter, Redirect } from 'react-router-dom';

/** Private Routes */
// import PrivateRoute from './PrivateRoute';

/** Public Routes */
import PublicRoute from './PublicRoute';

// import { withSuspense } from '../hoc/withSuspense';
// import TransparentLoader from '../components/loaders/TransparentLoader';
// import Dashboard from '../pages/dashboard/Dashboard';
// import Login from '../pages/login/Login';
import PageNotFound from '../pages/error-pages/PageNotFound';
// const Dashboard = withSuspense(React.lazy(() => import(/* webpackChunkName: "Dashboard" */ '../pages/Dashboard')) ,<TransparentLoader/>);
import Navbar from '../components/forms/Navbar';
import Registration from '../components/forms/registration/Registration';
import LogIn from '../components/forms/log-in/LogIn';
import CustomerDetails from '../components/forms/customer-home/CustomerDetails';
import CustomerEdit from '../components/forms/customer-home/CustomerEdit';
import CustomerAdd from '../components/forms/customer-home/CustomerAdd';
import Home from '../components/forms/customer-home/Home';
import BooksDetails from '../components/forms/books-home/BooksDetails';
import BooksAdd from '../components/forms/books-home/BooksAdd';
import BooksEdit from '../components/forms/books-home/BooksEdit';
import MobileDetails from '../components/forms/mobiles-home/MobileDetails';
import MobileAdd from '../components/forms/mobiles-home/MobileAdd';
import MobileEdit from '../components/forms/mobiles-home/mobileEdit';

const CmsRoutes = () => {
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [bookModal, setBookModal] = useState(false);
	const [bookEditModal, setBookEditModal] = useState(false);
	const [mobileAddModal, setMobileAddModal] = useState(false);
	const [mobileEditModal, setMobileEditModal] = useState(false);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				{/* <PublicRoute exact path="/login" component={Login} /> */}

				{/* <PublicRoute exact path="/" component={Dashboard} /> */}
				{/* Use below code for dashboard when login form is done */}
				{/* <PrivateRoute exact path="/" component={Dashboard} /> */}

				<PublicRoute exact path="/" component={Registration} />
				<PublicRoute path="/logIn" component={LogIn} />
				<PublicRoute
					path="/customerDetails"
					component={() => <CustomerDetails editModal={editModal} setEditModal={setEditModal} addModal={addModal} setAddModal={setAddModal} />}
				/>
				<PublicRoute exact path="/home" component={Home} />
				<PublicRoute path="/customerAdd" component={() => <CustomerAdd addModal={addModal} setAddModal={setAddModal} />} />
				<PublicRoute
					path="/customerEdit/:id"
					component={(props) => <CustomerEdit id={props.match.params.id} editModal={editModal} setEditModal={setEditModal} />}
				/>
				<PublicRoute
					path="/customerEdit"
					component={(props) => <CustomerEdit id={props.match.params.id} editModal={editModal} setEditModal={setEditModal} />}
				/>

				<PublicRoute
					path="/booksDetails"
					component={() => (
						<BooksDetails bookModal={bookModal} setBookModal={setBookModal} bookEditModal={bookEditModal} setBookEditModal={setBookEditModal} />
					)}
				/>
				<PublicRoute path="/booksAdd" component={() => <BooksAdd bookModal={bookModal} setBookModal={setBookModal} />} />
				<PublicRoute
					path="/booksEdit/:id"
					component={(props) => <BooksEdit id={props.match.params.id} bookEditModal={bookEditModal} setBookEditModal={setBookEditModal} />}
				/>
				<PublicRoute
					path="/booksEdit"
					component={(props) => <BooksEdit id={props.match.params.id} bookEditModal={bookEditModal} setBookEditModal={setBookEditModal} />}
				/>

				<PublicRoute
					path="/mobileDetails"
					component={() => (
						<MobileDetails
							mobileAddModal={mobileAddModal}
							setMobileAddModal={setMobileAddModal}
							mobileEditModal={mobileEditModal}
							setMobileEditModal={setMobileEditModal}
						/>
					)}
				/>
				<PublicRoute path="/mobileAdd" component={() => <MobileAdd mobileAddModal={mobileAddModal} setMobileAddModal={setMobileAddModal} />} />

				<PublicRoute
					path="/mobileEdit/:id"
					component={(props) => <MobileEdit id={props.match.params.id} mobileEditModal={mobileEditModal} setMobileEditModal={setMobileEditModal} />}
				/>
				<PublicRoute path="/mobileEdit" component={(props) => <MobileEdit id={props.match.params.id} mobileEditModal={mobileEditModal} setMobileEditModal={setMobileEditModal} />} />
				<PublicRoute exact path="/404" component={PageNotFound} />
				<PublicRoute from="*" render={() => <Redirect to="/404" />} />
			</Switch>
		</BrowserRouter>
	);
};

export default withRouter(CmsRoutes); //withRouter HOC will let us use props for location and history
