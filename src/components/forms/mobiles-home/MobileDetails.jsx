import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../customer-home/Sidebar';
import Pagination from 'react-js-pagination';

import dateFormat from 'dateformat';
import { deleteMobile, autoFillMobiles, clearMobile } from '../../../actions/mobile.action';

import '../customer-home/customerModal.styles.css';
import '../styles.css';
import { toast } from 'react-toastify';

import mobile from './Mobile.json';
import allMobileDetails from './Mobile.json';

const MobileDetails = (props) => {
	const { setMobileAddModal, setMobileEditModal } = props;

	const { mobileList } = useSelector((state) => state.mobileReducer);
	const dispatch = useDispatch();
	const [searchByMobile, setSearchByMobile] = useState('');
	const [searchByBrand, setSearchByBrand] = useState('');
	const [filterdMobileList, setFilterdMobileList] = useState('');
	const [searchedList, setSearchedList] = useState();

	const [itemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const [totalMobileItem, setTotalMobileItem] = useState(0);
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;

	const handleSearchByName = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let newMobileList = [];
		if (value && name === 'mobile_search') {
			mobileList.filter((data) => {
				if (data.mobile_name.toLowerCase().includes(value.toLowerCase())) {
					newMobileList.push(data);
				}
			});
			setSearchByMobile(value);
			setFilterdMobileList(newMobileList);
			setTotalMobileItem(newMobileList.length);
			setSearchedList(newMobileList);
			setActivePage(1);
		} else if (value && name === 'brand_search') {
			mobileList.filter((data) => {
				if (data.brand_name.toLowerCase().includes(searchByBrand.toLowerCase())) {
					newMobileList.push(data);
				} else if (
					data.mobile_name.toLowerCase().includes(searchByMobile.toLowerCase()) &&
					data.brand_name.toLowerCase().includes(searchByBrand.toLowerCase())
				) {
					newMobileList.push(data);
				}
			});
			setSearchByBrand(value);
			setFilterdMobileList(newMobileList);
			setTotalMobileItem(newMobileList.length);
			setSearchedList(newMobileList);
			setActivePage(1);
		} else {
			setFilterdMobileList(mobileList);
			setTotalMobileItem(mobileList.length);
			setSearchByMobile('');
			setSearchByBrand('');
		}
	};

	const handleAddAutoData = () => {
		mobile.allMobileDetails.map((item) => {
			return item;
		});
		dispatch(autoFillMobiles(mobile.allMobileDetails));
	};

	const handleDelete = (id) => {
		dispatch(deleteMobile(id));
		toast.success('Mobile has been successfully deleted');
	};

	const showMobileList = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			if (searchByMobile) {
				setFilterdMobileList(searchedList);
				// console.log('searchedList in showMobileList',searchedList);
				setTotalMobileItem(searchedList.length);
			} else if (searchByBrand) {
				setFilterdMobileList(searchedList);
				// console.log('searchedList in showMobileList',searchedList);
				setTotalMobileItem(searchedList.length);
			} else {
				setFilterdMobileList(mobileList);
				setTotalMobileItem(mobileList.length);
			}
		}, 1000);
	};

	useEffect(() => {
		setFilterdMobileList(mobileList);
		setTotalMobileItem(mobileList.length);
	}, [mobileList]);

	useEffect(() => {
		showMobileList();
		// console.log('showMobileList activepage', activePage);
	}, [activePage]);

	return (
		<div className="container">
			<Sidebar />
			<div>
				<h5>Mobiles list </h5>
				<div className=" gap-2 flex ">
					<button type="button" className="btn btn-outline-secondary top-button" onClick={() => setMobileAddModal(true)}>
						<Link to={'/mobileAdd'}>Add Mobiles</Link>
					</button>{' '}
					<input type="input" placeholder="Search by Mobile Name" name="mobile_search" value={searchByMobile} onChange={handleSearchByName} />{' '}
					<input type="input" placeholder="Search by Brand Name" name="brand_search" value={searchByBrand} onChange={handleSearchByName} />{' '}
					<button type="button" className="btn btn-secondary top-button" onClick={() => dispatch(clearMobile())}>
						Clear List
					</button>{' '}
					<button type="button" className="btn btn-secondary top-button" onClick={handleAddAutoData}>
						Autofill
					</button>
				</div>
				<p className="text-end fs-5" style={{ padding: '10px' }}>
					Total Mobiles : {filterdMobileList.length}
				</p>

				{!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Image</th>
								<th>Mobile</th>
								<th>Brand</th>
								<th>RAM</th>
								<th>Storage</th>
								<th>Battery</th>
								<th>Reference Number</th>
								<th>Stock </th>
								<th>Price</th>
								<th>Added date</th>
								<th>Updated Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{filterdMobileList &&
								filterdMobileList.length > 0 &&
								filterdMobileList.slice(firstData, lastData).map((data, index) => {
									return (
										<tr key={index}>
											<td>
												<img src={data.mobile_image} alt="mobile" width="50" height="80" />{' '}
											</td>
											<td>{data.mobile_name}</td>
											<td>{data.brand_name}</td>
											<td>{data.ram}</td>
											<td>{data.storage}</td>
											<td>{data.battery}</td>
											<td>{data.reference_num}</td>
											<td>{data.stock}</td>
											<td>???{data.price}</td>
											<td>{dateFormat(data.added_date, 'dd-mm-yyyy hh:MM TT')}</td>
											<td>{dateFormat(data.updated_date, 'dd-mm-yyyy hh:MM TT')}</td>
											<td>{data.status}</td>
											<td>
												<button type="button" className="btn btn-success" onClick={(e) => handleDelete(data.id)}>Delete</button>
												<button type="button" className="btn btn-outline-secondary " onClick={() => setMobileEditModal(true)}>
													<Link to={`/mobileEdit/${data.id}`}>Edit</Link>
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
				{totalMobileItem >= itemsCountPerPage ? (
					<Pagination
						activePage={activePage}
						itemsCountPerPage={itemsCountPerPage}
						totalItemsCount={totalMobileItem}
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
export default MobileDetails;
