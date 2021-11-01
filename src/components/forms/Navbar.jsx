import React, { useEffect } from 'react';
import {  useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOff } from '../../actions/signup.action';

const Navbar = (props) => {
	const { logged, setLogged } = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const { userToken } = useSelector((state) => state.registration);
	console.log('logged', logged);

	useEffect(() => {
		let utoken = userToken;
		if (utoken) {
			setLogged(true);
		} else {
			setLogged(false);
		}
	});
	
	const handleLogout = () => {
		dispatch(logOff());
		history.push('/signUp');
	}

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
							<li className="nav-item">
								<Link to="/booksDetails" className="nav-link active">
									Books Details
								</Link>
							</li>
							
							{logged === true ? (
								<li className="nav-item">
									<Link to="/home" className="nav-link active">
										Home
									</Link>
								</li>
							) : (
								' '
							)}
						</ul>

						{logged === false ? (
							<span className="navbar-text">
								<Link to="/logIn" className="nav-link active">
									Login
								</Link>
							</span>
						) : (
							<span className="navbar-text">
								<button onClick={ handleLogout }>Logout</button>
							</span>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;

/*							<li className="nav-item">
								<Link to="/customerDetails" className="nav-link active">
									Customer Details
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/booksDetails" className="nav-link active">
									Books Details
								</Link>
							</li>
							 <li className="nav-item">
								<Link to="/customerAdd" className="nav-link active">
									Customer Add
								</Link>
							</li> 
							
							 <li className="nav-item">
								<Link to="/customerEdit" className="nav-link active">
									Customer Edit
								</Link>
							</li> */
