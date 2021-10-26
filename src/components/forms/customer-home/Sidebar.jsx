import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sideBar.styles.css';

const Sidebar = () => {
	return (
		<Menu>
			<a className="menu-item" href="/">
				Home
			</a>
			<a className="menu-item" href="/customerDetails">
				Customers
			</a>
			<a className="menu-item" href="/booksDetails">
				Books
			</a>
		</Menu>
	);
};

export default Sidebar;
