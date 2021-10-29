import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Pagination from 'react-js-pagination';
import dateFormat from 'dateformat';

import { deleteList, clearList } from '../../../actions/customer.action';
import './customerModal.styles.css';
import { toast } from 'react-toastify';

const CustomerDetails = (props) => {
	const { editModal, setEditModal, addModal, setAddModal } = props;
	const { customerData } = useSelector((state) => state.customerReducer);
	const dispatch = useDispatch();
	const [searchByName, setSearchByName] = useState('');
	const [searchByEmail, setSearchByEmail] = useState('');
	const [filteredCustomer, setFilteredCustomer] = useState('');

	const [itemsCountPerPage, setItemsCountPerPage] = useState(2);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(2);
	const [isLoading, setIsLoading] = useState(false);
	const totalData = customerData.length;
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;
	// let currentData = filteredCustomer.slice(firstData, lastData);

	const handleSearch = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		if (value && name === 'name_search') {
			let newData = [];
			customerData.filter((data) => {
				if (data.first_name.toLowerCase().includes(value.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setSearchByName(value);
			setFilteredCustomer(newData);
		} else if (value && name === 'email_search') {
			let newData = [];
			customerData.filter((data) => {
				if (data.email.toLowerCase().includes(searchByEmail.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				} else if (
					data.first_name.toLowerCase().includes(searchByName.toLowerCase()) &&
					data.email.toLowerCase().includes(searchByEmail.toLowerCase())
				) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setFilteredCustomer(newData);
		} else {
			setFilteredCustomer(customerData);
			setSearchByName('');
			setSearchByEmail('');
		}
	};

	const showBookList = (start, end) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setFilteredCustomer(customerData);
		}, 1000);
	};

	const handleDelete = (id) => {
		dispatch(deleteList(id));
		toast.success('Customer Data has been successfully deleted');
	}

	useEffect(() => {
		setFilteredCustomer(customerData);
	}, [customerData]);

	useEffect(() => {
		showBookList();
		console.log('activepage', activePage);
	}, [activePage]);

	console.log('isLoading', isLoading);

	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Customer list </h5>
				<button onClick={() => setAddModal(true)}>
					<Link to={'/customerAdd'}>Add Customer</Link>
				</button>{' '}
				<input placeholder="Search by First Name" name="name_search" value={searchByName} onChange={handleSearch} />
				<input placeholder="Search by Email" name="email_search" value={searchByEmail} onChange={handleSearch} />{' '}
				<button onClick={() => dispatch(clearList())}>Clear List</button>
				{!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>ID</th>
								<th>Initial</th>
								<th>First Name</th>
								<th>Middle Name</th>
								<th>Last Name</th>
								<th>Full Name</th>
								<th>Mobile No</th>
								<th>Email Id</th>
								<th>Regno</th>
								<th>Status</th>
								<th>Date</th>
								<th colSpan="2">Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredCustomer &&
								filteredCustomer.length > 0 &&
								filteredCustomer.slice(firstData, lastData).map((data, index) => {
									return (
										<tr key={index}>
											<td>{data.id}</td>
											<td>{data.initial}</td>
											<td>{data.first_name}</td>
											<td>{data.middle_name}</td>
											<td>{data.last_name}</td>
											<td>{data.fullname}</td>
											<td>{data.mobile_no}</td>
											<td>{data.email}</td>
											<td>{data.registration_num}</td>
											<td>{data.status}</td>
											<td> {dateFormat(data.date, 'dd-mm-yyyy hh:MM TT')} </td>
											<td>
												<button onClick={(e) => handleDelete(data.id)}>Delete</button>
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
				{customerData.length >= itemsCountPerPage ? (
					<Pagination
						activePage={activePage}
						itemsCountPerPage={itemsCountPerPage}
						totalItemsCount={totalData}
						pageRangeDisplayed={pageRangeDisplayed}
						onChange={(currentPage) => setActivePage(currentPage)}
					/>
				) : (
					' '
				)}
			</div>
		</div>
	);
};
export default CustomerDetails;

/* <Link to={'/detail/'+'d.id'}>edit</Link> */
/* <td>{index + 1}</td> 
.filter((data) => {
									if (data.first_name.toLowerCase().includes(searchByName.toLowerCase())) {
										return data;
									} else if (data.email.toLowerCase().includes(searchByName.toLowerCase())) {
										return data;
									} else if (
										data.first_name.toLowerCase().includes(searchByName.toLowerCase()) &&
										data.email.toLowerCase().includes(searchByName.toLowerCase())
									) {
										return data;
									}
								})*/
