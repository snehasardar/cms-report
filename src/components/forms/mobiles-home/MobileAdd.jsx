import { Formik, Form as FormikForm } from 'formik';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Select from 'react-select';
import { toast } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';

import '../registration/registration.styles.css';
import '../customer-home/customerModal.styles.css';
import '../styles.css';

import { STATUS_FORM } from '../../../shared/constants';
import { numberFieldValidation } from '../../../shared/common';

import { addMobile } from '../../../actions/mobile.action';

const initialValues = {
	mobile_image: '',
	mobile_name: '',
	brand_name: '',
	ram: '',
	storage: '',
	battery: '',
	stock: '',
	price: '',
	status: '',
};

const MobileAdd = (props) => {
	const { mobileAddModal, setMobileAddModal } = props;
	const dispatch = useDispatch();
	const history = useHistory();

	const validateBooksInformation = Yup.object().shape({
		mobile_image: Yup.string().required('Please enter an Image Link'),
		mobile_name: Yup.string()
			.trim()
			.min(1, 'Mobile Name cannot be less than 1 character long')
			.max(40, 'Mobile Name cannot be more than 40 characters long')
			.required('Please enter Mobile Name'),
		brand_name: Yup.string()
			.trim()
			.min(1, 'Brand Name cannot be less than 1 character long')
			.max(40, 'Brand Name cannot be more than 40 characters long')
			.required('Please enter Brand Name'),
		ram: Yup.string()
			.trim()
			.min(1, 'RAM cannot be less than 1 character long')
			.max(40, 'RAM cannot be more than 40 characters long')
			.required('Please enter RAM'),
		storage: Yup.string()
			.trim()
			.min(1, 'Mobile Storage cannot be less than 1 character long')
			.max(40, 'Mobile Storage cannot be more than 40 characters long')
			.required('Please enter Mobile Storage'),
		battery: Yup.string()
			.trim()
			.min(1, 'Battery Limit cannot be less than 1 character long')
			.max(40, 'Battery Limit cannot be more than 40 characters long')
			.required('Please enter Battery Limit'),
		stock: Yup.string()
			.min(1, 'Stock of mobiles must have minimum 1 digits')
			.max(10, 'Stock of mobiles must have maximum 10 digits')
			.trim()
			.required('Please enter Stock')
			.matches('^[0-9]+$', 'Mobile Stock should be numbers'),
		price: Yup.string()
			.min(1, 'price must have minimum 1 digits')
			.max(10, 'price must have maximum 10 digits')
			.trim()
			.required('Please enter price')
			.matches('^[0-9]+$', 'price should be numbers'),
		status: Yup.object().required('Please select status'),
	});

	const handleSubmitEvent = (values, actions) => {
		let post_data = {
			mobile_image: values.mobile_image,
			mobile_name: values.mobile_name,
			brand_name: values.brand_name,
			ram: values.ram,
			storage: values.storage,
			battery: values.battery,
			stock: values.stock,
			price: values.price,
			status: values.status.value,
			added_date: new Date().toLocaleString(),
		};

		dispatch(addMobile(post_data));
		toast.success('The Mobile has been added successfully');
		console.log('post_data', post_data);
		history.push('/mobileDetails');
	};

	const handleMobileNumberChange = (event, setFieldValue) => {
		event.preventDefault();
		let { value, name } = event.target;
		value = numberFieldValidation(value);
		setFieldValue(name, value);
	};

	const handleClose = () => {
		history.push('/mobileDetails');
	};

	return (
		<Modal className="requestCallModal" show={mobileAddModal} onHide={() => setMobileAddModal(false)} backdrop="static" centered>
			<Modal.Header closeButton onClick={handleClose}></Modal.Header>
			<Modal.Body>
				<div className="requestCallWrapper">
					<Row>
						<Col xs={12} md={5} className="callBackBg"></Col>
						
						<Col xs={12} md={7} className="">
							<h3>Add Mobile </h3>
							<Formik initialValues={initialValues} validationSchema={validateBooksInformation} onSubmit={handleSubmitEvent}>
								{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
									return (
										<FormikForm>
											{/* {console.log('errors', errors)} */}
											<Form.Group controlId="mobile_name">
												<Form.Control
													type="text"
													placeholder="mobile_name *"
													onChange={handleChange}
													value={values.mobile_name}
													isInvalid={errors.mobile_name && touched.mobile_name}
												/>
												{errors.mobile_name && touched.mobile_name ? <p className="error no-pos"> {errors.mobile_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="mobile_image">
												<Form.Control
													type="link"
													placeholder="Image-Link *"
													onChange={handleChange}
													value={values.mobile_image}
													isInvalid={errors.mobile_image && touched.mobile_image}
												/>
												{errors.mobile_image && touched.mobile_image ? <p className="error no-pos"> {errors.mobile_image}</p> : null}
											</Form.Group>
											<Form.Group controlId="brand_name">
												<Form.Control type="text" placeholder="brand_name *" onChange={handleChange} value={values.brand_name} />
												{errors.brand_name && touched.brand_name ? <p className="error no-pos"> {errors.brand_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="ram">
												<Form.Control
													type="text"
													placeholder="ram of the Mobile *"
													onChange={handleChange}
													value={values.ram}
													isInvalid={errors.ram && touched.ram}
												/>
												{errors.ram && touched.ram ? <p className="error no-pos"> {errors.ram}</p> : null}
											</Form.Group>
											<Form.Group controlId="storage">
												<Form.Control
													type="text"
													placeholder="storage of the Mobile *"
													onChange={handleChange}
													value={values.storage}
													isInvalid={errors.storage && touched.storage}
												/>
												{errors.storage && touched.storage ? <p className="error no-pos"> {errors.storage}</p> : null}
											</Form.Group>
											<Form.Group controlId="battery">
												<Form.Control
													type="text"
													placeholder="battery of the Mobile *"
													onChange={handleChange}
													value={values.battery}
													isInvalid={errors.battery && touched.battery}
												/>
												{errors.battery && touched.battery ? <p className="error no-pos"> {errors.battery}</p> : null}
											</Form.Group>
											<Form.Group controlId="stock">
												<Form.Control
													type="number"
													name="stock"
													placeholder="Stock*"
													value={values.stock}
													onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
													isInvalid={errors.stock && touched.stock}
												/>
												{errors.stock && touched.stock ? <p className="error no-pos"> {errors.stock}</p> : null}
											</Form.Group>
											<Form.Group controlId="price">
												<Form.Control
													type="text"
													name="price"
													placeholder="price *"
													value={values.price}
													onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
													isInvalid={errors.price && touched.price}
												/>
												{errors.price && touched.price ? <p className="error no-pos"> {errors.price}</p> : null}
											</Form.Group>
											<Form.Row>
												<Form.Group as={Col} sm="6" controlId="status">
													<Select
														options={STATUS_FORM}
														className="basic-select"
														classNamePrefix="select"
														getOptionValue={(x) => x.value}
														getOptionLabel={(x) => x.label}
														onChange={(evt) => setFieldValue('status', evt)} //set variable gender in formik state
														defaultValue={values.status}
														placeholder="Select Status *"
													/>
													{errors.status && touched.status ? <p className="error no-pos"> {errors.status}</p> : null}
												</Form.Group>
											</Form.Row>
											{errors.message ? (
												<Row>
													<Col xs={12} sm={12} md={12}>
														<span className="errorMsg">{errors.message}</span>
													</Col>
												</Row>
											) : null}
											<Button variant="primary" className="btn btnRed" type="submit">
												Add
											</Button>
										</FormikForm>
									);
								}}
							</Formik>
						</Col>
					</Row>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default MobileAdd;

/*

			
			*/
