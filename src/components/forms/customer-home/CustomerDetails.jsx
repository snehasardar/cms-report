import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';

import { deleteList } from '../../../actions/customer.action';

const CustomerDetails = () => {
	const { customerData } = useSelector((state) => state.customerCart);
	// console.log('customerData', customerData);
	// console.log('customerData firstname', customerData.first_name);
	const dispatch = useDispatch();
	const history = useHistory();
	const [searchItem, setSearchItem] = useState('');

	const handleClick = () => {
		history.push('/customerAdd');
		console.log('hello');
	};
	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Customer list </h5>
				<button onClick={handleClick}>Add Customer</button> <input placeholder="Search by First Name" onChange={(e) => setSearchItem(e.target.value)} />{' '}
				<input placeholder="Search by Email" onChange={(e) => setSearchItem(e.target.value)} />
				{/* <button>search</button> */}
				<table className="table">
					<thead>
						<tr>
							<th>First Name</th>
							<th>Middle Name</th>
							<th>Last Name</th>
							<th>Mobile No</th>
							<th>Email Id</th>
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
										return data;
									}
								})
								.map((data, index) => {
									return (
										<tr key={index}>
											<td>{data.first_name}</td>
											<td>{data.middle_name}</td>
											<td>{data.last_name}</td>
											<td>{data.mobile_no}</td>
											<td>{data.email}</td>
											<td>{data.status}</td>
											<td>{data.date}</td>
											<td>
												<button onClick={() => dispatch(deleteList(data.first_name))}>Delete</button>
											</td>
											<td>
												<button>Edit</button>
											</td>
										</tr>
									);
								})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default CustomerDetails;
