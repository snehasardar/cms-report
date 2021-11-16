import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <div>
            <nav className="navbar navbar-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Shop now</a>
					
					<form className="d-flex">
                        <button className="btn btn-outline-success" type="button">
							<Link to={`/shop/productsListCart`} >Cart</Link>
						</button>
					</form>
				</div>
			</nav>
        </div>
    )
}
export default Header;