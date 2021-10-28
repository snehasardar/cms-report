import React from 'react';
import Sidebar from './Sidebar';
import './sideBar.styles.css';

const Home = (props) => {
	const { logged, setLogged } = props;
	console.log(' home logged',logged);
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
