import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './sideBar.styles.css';

const Sidebar = () => {
	return (
		<Menu>
			<Link to={'/home'} className="menu-item" >
				Home
			</Link>
			<Link to={'/customerDetails'} className="menu-item" >
				Customers
			</Link>
			<Link to={'/booksDetails'} className="menu-item" >
				Books
			</Link>
		</Menu>
	);
};

export default Sidebar;
