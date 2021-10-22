import React from 'react';
import { Link } from 'react-router-dom';
// import Sidebar from './customer-home/Sidebar';

const Navbar = (props) => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<a className="navbar-brand">CMS</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to="/signUp" className="nav-link active">
									Registration
								</Link>
							</li>
						</ul>
						<span className="navbar-text">
							<Link to="/logIn" className="nav-link active">
								Login
							</Link>
						</span>
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
