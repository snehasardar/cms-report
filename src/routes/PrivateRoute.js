import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default ({ component: Component, ...rest }) => {
	const { isloggedin } = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) => {
				return localStorage.getItem('token') && isloggedin ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				);
			}}
		/>
	);
};
