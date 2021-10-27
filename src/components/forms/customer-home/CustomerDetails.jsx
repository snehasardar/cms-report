import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Pagination from 'react-js-pagination';

import { deleteList, clearList } from '../../../actions/customer.action';
import './customerModal.styles.css';

const CustomerDetails = (props) => {
	const { editModal, setEditModal, addModal, setAddModal } = props;
	const { customerData } = useSelector((state) => state.customerCart);
	const dispatch = useDispatch();
	const history = useHistory();
	const [searchByName, setSearchByName] = useState('');

	const [posts, setPosts] = useState([]);
	const [itemsCountPerPage, setItemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const totalData = customerData.length;
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;
	let currentData = posts.slice(firstData, lastData);
	console.log('index of lastData', lastData);
	console.log('index of firstData', firstData);
	console.log('currentData', currentData);

	const handleSearchByName = (e) => {
		setSearchByName(e.target.value);
		console.log('handleSearchByName ', searchByName);
	};

	const showBookList = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setPosts(customerData);
		}, 1000);
	};

	useEffect(() => {
		showBookList(firstData, lastData);
		console.log('activepage', activePage);
	}, [activePage]);

	console.log('isLoading', isLoading);

	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Customer list </h5>
				<button  onClick={() => setAddModal(true)}><Link to={'/customerAdd'}>Add Customer</Link></button>{' '}
				<input placeholder="Search by First Name" onChange={handleSearchByName} />{' '}
				<input placeholder="Search by Email" onChange={handleSearchByName} />{' '}
				<button onClick={() => dispatch(clearList())}>Clear List</button>
				{!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>id</th>
								<th>First Name</th>
								<th>Middle Name</th>
								<th>Last Name</th>
								<th>Mobile No</th>
								<th>Email Id</th>
								<th>Regno</th>
								<th>Status</th>
								<th>Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{customerData &&
								customerData
									.filter((data) => {
										if (searchByName === '') {
											return data;
										} else if (data.first_name.toLowerCase().includes(searchByName.toLowerCase())) {
											return data;
										} else if (data.email.toLowerCase().includes(searchByName.toLowerCase())) {
											return data;
										}else if (
											data.first_name.toLowerCase().includes(searchByName.toLowerCase()) &&
											data.email.toLowerCase().includes(searchByName.toLowerCase())
										) {
											return data;
										}
									})
									.map((data, index) => {
										return (
											<tr key={index}>
												<td>{data.id}</td>
												<td>{data.first_name}</td>
												<td>{data.middle_name}</td>
												<td>{data.last_name}</td>
												<td>{data.mobile_no}</td>
												<td>{data.email}</td>
												<td>{data.registration_num}</td>
												<td>{data.status}</td>
												<td>{data.date}</td>
												<td>
													<button onClick={() => dispatch(deleteList(data.first_name))}>Delete</button>
												</td>
												<td>
													<button onClick={() => setEditModal(true)}>
														<Link to={`/customerEdit/${data.id}`}>Edit</Link>
													</button>
												</td>
											</tr>
										);
									})}
						</tbody>
					</Table>
				) : (
					<div>Loading...</div>
				)}
				<Pagination
					activePage={activePage}
					itemsCountPerPage={itemsCountPerPage}
					totalItemsCount={totalData}
					pageRangeDisplayed={pageRangeDisplayed}
					onChange={(currentPage) => setActivePage(currentPage)}
				/>
			</div>
		</div>
	);
};
export default CustomerDetails;

/* <Link to={'/detail/'+'d.id'}>edit</Link> */
/* <td>{index + 1}</td> */
