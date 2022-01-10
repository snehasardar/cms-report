import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Pagination from 'react-js-pagination';
import dateFormat from 'dateformat';

import { deleteList, clearList, addAllData } from '../../../actions/customer.action';
import './customerModal.styles.css';
import '../styles.css';
import { toast } from 'react-toastify';

import customers from './customers.json';

const CustomerDetails = (props) => {
	const { setEditModal, setAddModal } = props;
	const { customerData } = useSelector((state) => state.customerReducer);
	const dispatch = useDispatch();
	const [searchByName, setSearchByName] = useState('');
	const [searchByCustomerEmail, setSearchByCustomerEmail] = useState('');
	const [filteredCustomer, setFilteredCustomer] = useState('');
	const [searchedCustomerList, setSearchedCustomerList] = useState('');

	const [itemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const [totalData, setTotalData] = useState(0);
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;

	const handleSearch = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log('value', value);
		let newData = [];
		if (value && name === 'name_search') {
			customerData.filter((data) => {
				if (data.first_name.toLowerCase().includes(value.toLowerCase())) {
					newData.push(data);
				}
			});
			setSearchByName(value);
			setFilteredCustomer(newData);
			setTotalData(newData.length);
			setSearchedCustomerList(newData);
			setActivePage(1);
		} else if (value && name === 'email_search') {
			customerData.filter((data) => {
				if (data.email.toLowerCase().includes(searchByCustomerEmail.toLowerCase())) {
					newData.push(data);
				} else if (
					data.first_name.toLowerCase().includes(searchByName.toLowerCase()) &&
					data.email.toLowerCase().includes(searchByCustomerEmail.toLowerCase())
				) {
					newData.push(data);
				}
			});
			setSearchByCustomerEmail(value);
			setFilteredCustomer(newData);
			setTotalData(newData.length);
			setSearchedCustomerList(newData);
			setActivePage(1);
		} else {
			setFilteredCustomer(customerData);
			setTotalData(customerData.length);
			setSearchByName('');
			setSearchByCustomerEmail('');
		}
	};

	const handleAddAutoData = () => {
		customers.allCustomerDetails.map((item) => {
			return console.log(item);
		});
		dispatch(addAllData(customers.allCustomerDetails));
	};

	const handleDelete = (id) => {
		dispatch(deleteList(id));
		toast.success('Customer Data has been successfully deleted');
	};
	const handleClear = () => {
		dispatch(clearList());
		setTotalData(0);
	};

	const showCustomerList = (start, end) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			if (searchByName) {
				setFilteredCustomer(searchedCustomerList);
				setTotalData(searchedCustomerList.length);
			} else if (searchByCustomerEmail) {
				setFilteredCustomer(searchedCustomerList);
				setTotalData(searchedCustomerList.length);
			} else {
				setFilteredCustomer(customerData);
				setTotalData(customerData.length);
			}
		}, 1000);
	};

	useEffect(() => {
		setFilteredCustomer(customerData);
		setTotalData(customerData.length);
	}, [customerData]);

	useEffect(() => {
		showCustomerList();
		console.log('activepage', activePage);
	}, [activePage]);

	console.log('isLoading', isLoading);

	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Customer list </h5>

				<div className=" gap-2 flex ">
					<button type="button" className="btn btn-outline-secondary top-button" onClick={() => setAddModal(true)}>
						<Link to={'/customerAdd'}>Add Customer</Link>
					</button>{' '}
					<input type="input" placeholder="Search by First Name" name="name_search" value={searchByName} onChange={handleSearch} />{' '}
					<input type="input" placeholder="Search by Email" name="email_search" value={searchByCustomerEmail} onChange={handleSearch} />{' '}
					<button type="button" className="btn btn-secondary top-button" onClick={() => handleClear()}>
						Clear List
					</button>{' '}
					<button type="button" className="btn btn-secondary top-button" onClick={handleAddAutoData}>
						Autofill
					</button>
				</div>
				<p className="text-end fs-5" style={{ padding: '10px' }}>
					Total Customer : {filteredCustomer.length}
				</p>
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
								<th>Action</th>
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
												<button type="button" className="btn btn-success" onClick={(e) => handleDelete(data.id)}>
													Delete
												</button>

												<button type="button" className="btn btn-outline-secondary " onClick={() => setEditModal(true)}>
													<Link to={`/customerEdit/${data.id}`}>Edit</Link>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				) : (
					<div className="text-center">
						<button className="btn btn-light text-dark" type="button" disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							Loading...
						</button>
					</div>
				)}
				{totalData > itemsCountPerPage ? (
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
