import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';

import { deleteList, clearList } from '../../../actions/customer.action';
import './customerModal.styles.css';

const CustomerDetails = (props) => {
	const { editModal, setEditModal, addModal, setAddModal } = props;
	console.log('editModal details', editModal);
	console.log('setEditModal details',setEditModal);
	console.log('addModal details', addModal);
	console.log('setAddModal details',setAddModal);
	const { customerData } = useSelector((state) => state.customerCart);
	console.log('customerData', customerData);
	const dispatch = useDispatch();
	const history = useHistory();
	const [searchItem, setSearchItem] = useState('');


	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Customer list </h5>
				<button  onClick={() => setAddModal(true)}><Link to={'/customerAdd'}>Add Customer</Link></button>{' '}
				<input placeholder="Search by First Name" onChange={(e) => setSearchItem(e.target.value)} />{' '}
				<input placeholder="Search by Email" onChange={(e) => setSearchItem(e.target.value)} />{' '}
				<button onClick={() => dispatch(clearList())}>Clear List</button>
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
									if (searchItem === '') {
										return data;
									} else if (data.first_name.toLowerCase().includes(searchItem.toLowerCase())) {
										return data;
									} else if (data.email.toLowerCase().includes(searchItem.toLowerCase())) {
										// console.log('data of email',data.email)
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
			</div>
		</div>
	);
};
export default CustomerDetails;

/* <Link to={'/detail/'+'d.id'}>edit</Link> */
/* <td>{index + 1}</td> */
