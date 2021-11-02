import { Formik, Form as FormikForm } from 'formik';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Select from 'react-select';
import { toast } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';

import '../registration/registration.styles.css';
import './customerModal.styles.css';
import '../styles.css';

import { GENDERS_FORM, REGEX_FULL_NAME, INITIAL_FORM, STATUS_FORM } from '../../../shared/constants';
import { numberFieldValidation, selectInitial, selectStatus } from '../../../shared/common';

import { editList } from '../../../actions/customer.action';

const initialValues = {
	initial: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	mobile_no: '',
	email: '',
	status: '',
};
console.log('initialValues', initialValues);

const CustomerEdit = (props) => {
	const { editModal, setEditModal } = props;
	const { id } = props;
	const { customerData } = useSelector((state) => state.customerReducer);
	console.log('customerData', customerData);
	const dispatch = useDispatch();
	const history = useHistory();

	const currentData = customerData.find((item) => item.id == id);
	console.log('currentData', currentData);

	const validateRequestCallBack = Yup.object().shape({
		initial: Yup.object().required('Please select any one initial'),
		first_name: Yup.string()
			.trim()
			.min(1, 'Name cannot be less than 1 character long')
			.max(40, 'Name cannot be more than 40 characters long')
			.required('Please enter your First Name')
			.test('name', "Name supports only alphabets and some other characters. ('.)", (value) => value && value.match(REGEX_FULL_NAME)),
		last_name: Yup.string()
			.trim()
			.min(1, 'Name cannot be less than 1 character long')
			.max(40, 'Name cannot be more than 40 characters long')
			.required('Please enter your Last Name')
			.test('name', "Name supports only alphabets and some other characters. ('.)", (value) => value && value.match(REGEX_FULL_NAME)),
		mobile_no: Yup.string()
			.min(10, 'Mobile number must have minimum 10 digits')
			.max(10, 'Mobile number must have maximum 10 digits')
			.trim()
			.required('Please enter your Mobile Number')
			.matches('^[0-9]+$', 'Mobile number should be numbers'),
		email: Yup.string().trim().email('Enter valid Email Id').required('Please enter Email Id'),
		status: Yup.object().required('Please select status'),
	});

	const newInitialValues = Object.assign(initialValues, {
		initial: currentData && Object.keys(currentData).length > 0 ? selectInitial(currentData.initial) : '',
		first_name: currentData && Object.keys(currentData).length > 0 ? currentData.first_name : '',
		middle_name: currentData && Object.keys(currentData).length > 0 ? currentData.middle_name : '',
		last_name: currentData && Object.keys(currentData).length > 0 ? currentData.last_name : '',
		mobile_no: currentData && Object.keys(currentData).length > 0 ? currentData.mobile_no : '',
		email: currentData && Object.keys(currentData).length > 0 ? currentData.email : '',
		status: currentData && Object.keys(currentData).length > 0 ? selectStatus(currentData.status) : '',
	});

	const handleSubmitEvent = (values, actions) => {
		let post_data = {
			id: currentData && Object.keys(currentData).length > 0 ? currentData.id : '',
			initial: values.initial.value,
			first_name: values.first_name,
			middle_name: values.middle_name,
			last_name: values.last_name,
			fullname: `${values.initial.label} ${values.first_name} ${values.middle_name} ${values.last_name}`,
			mobile_no: values.mobile_no,
			email: values.email,
			date: currentData && Object.keys(currentData).length > 0 ? currentData.date : '',
			status: values.status.value,
		};

		const  remainUser = customerData.filter((item) => item.email !== currentData.email);
		console.log(' remainUser', remainUser);
		const existedtUser =  remainUser.find((item) => item.email === values.email);
		const editedUser = remainUser.find((item) => item.mobile_no === values.mobile_no);
		if (existedtUser && Object.keys(existedtUser).length > 0) {
			toast.error('there is customer with this email');
		} else if (editedUser && Object.keys(editedUser).length > 0) {
			toast.warning('there is customer with this mobile number');
		} else {
			dispatch(editList(post_data));
			toast.success('Customer Data has been successfully edited');
			history.push('/customerDetails');
		}
	};

	const handleMobileNumberChange = (event, setFieldValue) => {
		event.preventDefault();
		let { value, name } = event.target;
		value = numberFieldValidation(value);
		setFieldValue(name, value);
	};

	const handleClose = () => {
		history.push('/customerDetails');
	};

	return (
		<Modal className="requestCallModal" show={editModal} onHide={() => setEditModal(false)} backdrop="static" centered>
			<Modal.Header closeButton onClick={handleClose}></Modal.Header>
			<Modal.Body>
				<div className="requestCallWrapper">
					<Row>
						<Col xs={12} md={5} className="callBackBg"></Col>
						<Col xs={12} md={7} className="">
							<h3>Edit Customer's Data</h3>
							<Formik initialValues={newInitialValues} validationSchema={validateRequestCallBack} onSubmit={handleSubmitEvent}>
								{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
									return (
										<FormikForm>
											{console.log('errors', errors)}
											<Form.Row>
												<Form.Group as={Col} sm="6" controlId="initial">
													<Select
														options={INITIAL_FORM}
														className="basic-select"
														classNamePrefix="select"
														getOptionValue={(x) => x.value}
														getOptionLabel={(x) => x.label}
														onChange={(evt) => setFieldValue('initial', evt)} //set variable gender in formik state
														defaultValue={values.initial}
														placeholder="Select Initial *"
													/>
													{errors.initial && touched.initial ? <p className="error no-pos"> {errors.initial}</p> : null}
												</Form.Group>
											</Form.Row>
											<br />
											<br />
											<br />
											<Form.Group controlId="first_name">
												<Form.Control
													type="text"
													placeholder="First-Name *"
													onChange={handleChange}
													value={values.first_name}
													isInvalid={errors.first_name && touched.first_name}
												/>
												{errors.first_name && touched.first_name ? <p className="error no-pos"> {errors.first_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="middle_name">
												<Form.Control type="text" placeholder="Middle-Name" onChange={handleChange} value={values.middle_name} />
											</Form.Group>
											<Form.Group controlId="last_name">
												<Form.Control
													type="text"
													placeholder="Last-Name *"
													onChange={handleChange}
													value={values.last_name}
													isInvalid={errors.last_name && touched.last_name}
												/>
												{errors.last_name && touched.last_name ? <p className="error no-pos"> {errors.last_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="mobile_no">
												<Form.Control
													type="text"
													name="mobile_no"
													placeholder="Mobile Number *"
													value={values.mobile_no}
													onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
													isInvalid={errors.mobile_no && touched.mobile_no}
												/>
												{errors.mobile_no && touched.mobile_no ? <p className="error no-pos"> {errors.mobile_no}</p> : null}
											</Form.Group>
											<Form.Group controlId="email">
												<Form.Control
													type="text"
													placeholder="Email Id *"
													onChange={handleChange}
													value={values.email}
													isInvalid={errors.email && touched.email}
												/>
												{errors.email && touched.email ? <p className="error no-pos"> {errors.email}</p> : null}
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
												Save
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

export default CustomerEdit;
