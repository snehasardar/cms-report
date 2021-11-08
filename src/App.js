import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import 'bootstrap/dist/css/bootstrap.min.css';

// import './assets/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import FullPageLoader from './components/loaders/FullPageLoader';
import ErrorFallback from './Error/ErrorBoundary/ErrorFallback';
import errorHandler from './Error/ErrorBoundary/errorHandler';
import { withSuspense } from './hoc/withSuspense';

const CmsRoutes = withSuspense(
	lazy(() => import(/* webpackChunkName: "cms-routes" */ './routes/CmsRoutes')),
	<FullPageLoader />
);
const ShopRoutes = withSuspense(
	lazy(() => import(/* webpackChunkName: "shop-routes" */ './routes/ShopRoutes')),
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
	const isShop = window.location.href.search('shop') > 0;

	return (
		<>
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
				{isShop ? (
					<Switch>
						<Route path="/" component={ShopRoutes} />
					</Switch>
				) : (
					<Switch>
						<Route path="/" component={CmsRoutes} />
					</Switch>
				)}
			</ErrorBoundary>
			<ToastContainer />
		</>
	);
}

export default App;
