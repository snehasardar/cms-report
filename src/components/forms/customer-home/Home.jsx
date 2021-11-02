import React from 'react';
import Sidebar from './Sidebar';
import './sideBar.styles.css';

const Home = () => {
	return (
		<div className="App" id="outer-container">
			<Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
			<div id="page-wrap">
				<h1>welcome to CMS Report</h1>
			</div>
		</div>
	);
};
export default Home;
