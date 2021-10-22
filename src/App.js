import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

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

const Routes = withSuspense(
	lazy(() => import(/* webpackChunkName: "routes" */ './routes/Routes')),
	<FullPageLoader />
);

function App() {
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
					<Navbar />
					<Switch>
						<Route exact path="/signUp" component={Registration} />
						<Route path="/logIn" component={LogIn} />
						<Route path="/customerDetails" component={CustomerDetails} />
						<Route path="/home" component={Home} />
						<Route path="/customerAdd" component={CustomerAdd} />
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
