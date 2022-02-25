import React from 'react';
import {  useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOff } from '../../actions/signup.action';

const Navbar = () => {
	const { loggedIn } = useSelector((state) => state.registration);
	const dispatch = useDispatch();
	const history = useHistory();
	console.log('loggedIn',loggedIn)
	
	const handleLogout = () => {
		dispatch(logOff());
		history.push('/logIn');
	}

	return (
		<div>
			<nav className="navbar navbar-expand-lg  navbar-dark" style={{ backgroundColor: "#337ab7" }}>
				<div className="container-fluid" >
					<a className="navbar-brand" href="# ">CMS</a>
					
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{loggedIn === false ? (
							<li className="nav-item">
								<Link to="/" className="nav-link active">
									Registration
								</Link>
							</li>
						) : ( ' ')}
							{loggedIn === true ? (
								<li className="nav-item">
									<Link to="/home" className="nav-link active">
										Home
									</Link>
								</li>
							) : (
								' '
							)}
						</ul>

						{loggedIn === false ? (
							<span className="navbar-text">
								<Link to="/logIn" className="nav-link active">
									Login
								</Link>
							</span>
						) : (
							
							<span className="navbar-text">
								<button type="button" className="btn btn-secondary " onClick={ handleLogout }>Logout</button>
							</span>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
