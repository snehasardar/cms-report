import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/styles.css';

import FullPageLoader from './components/loaders/FullPageLoader';
import ErrorFallback from './Error/ErrorBoundary/ErrorFallback';
import errorHandler from './Error/ErrorBoundary/errorHandler';
import { withSuspense } from './hoc/withSuspense';

import Navbar from './components/forms/Navbar';
import Registration from './components/forms/registration/Registration';
import LogIn from './components/forms/log-in/LogIn';
import CustomerDetails from './components/forms/customer-home/CustomerDetails';
import Home from './components/forms/customer-home/Home';
import CustomerAdd from './components/forms/customer-home/CustomerAdd';
import CustomerEdit from './components/forms/customer-home/CustomerEdit';
import BooksDetails from './components/forms/books-home/BooksDetails';
import BooksAdd from './components/forms/books-home/BooksAdd';

const Routes = withSuspense(
	lazy(() => import(/* webpackChunkName: "routes" */ './routes/Routes')),
	<FullPageLoader />
);

function App() {
	const [editModal, setEditModal] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const [bookModal, setBookModal] = useState(false);
	const [logged, setLogged] = useState(false);
	useEffect(() => {
		// Disable logs in production
		if (process.env.NODE_ENV !== 'development') {
			let noOp = function () {}; // no-op function
			if (!window.console) {
				console = {
					log: noOp,
					warn: noOp,
					error: noOp,
				};
			} else {
				console = {
					...console,
					log: noOp,
					warn: noOp,
					error: noOp,
				};
			}
		}
	}, []);

	return (
		<>
			<BrowserRouter>
				<div className="App">
					<Navbar logged={logged} setLogged={setLogged} />
					<Switch>
						<Route exact path="/signUp" component={Registration} />
						<Route path="/logIn" component={() => < LogIn logged={logged} setLogged={setLogged} />} />
						<Route path="/customerDetails" component={() => <CustomerDetails editModal={editModal} setEditModal={setEditModal} addModal={addModal} setAddModal={setAddModal} />} />
						<Route exact path="/home" component={Home} /> 
						<Route path="/customerAdd" component={() => <CustomerAdd  addModal={addModal} setAddModal={setAddModal} />} />
						<Route path="/customerEdit/:id" component={(props) => <CustomerEdit id={props.match.params.id} editModal={editModal} setEditModal={setEditModal}/>} />
						<Route
							path="/customerEdit"
							component={(props) => <CustomerEdit id={props.match.params.id} editModal={editModal} setEditModal={setEditModal} />}
						/>
						<Route path="/booksDetails" component={() => <BooksDetails bookModal={bookModal} setBookModal={setBookModal}/>} />
						<Route path="/booksAdd" component={() => <BooksAdd  bookModal={bookModal} setBookModal={setBookModal}/>} />
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
