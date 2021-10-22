import { Formik, Form as FormikForm } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';

import '../registration/registration.styles.css';
import '../styles.css';

import { GENDERS_FORM, REGEX_FULL_NAME } from '../../../shared/constants';
import { numberFieldValidation, selectGender } from '../../../shared/common';

const initialValues = {
	email: '',
	password: '',
};
console.log('initialValues', initialValues);

const LogIn = (props) => {
	const { logged, setLogged } = props;
	const history = useHistory();
	const userData = useSelector((state) => state.signCart.userData);

	const validateRequestCallBack = Yup.object().shape({
		email: Yup.string().trim().email('Enter valid Email Id').required('Please enter Email Id'),
		password: Yup.string().trim().required('Please enter Password'),
	});

	const handleSubmitEvent = (values, actions) => {
		let postdata = {
			email: values.email,
			password: values.password,
		};
		console.log('post_data', postdata);
		if (postdata.email == newInitialValues.uemail && postdata.password == newInitialValues.upassword) {
			alert('successfully login');
			history.push('/home');
		} else {
			alert('Incorrect Details');
		}
		console.log('post_data name', postdata.password);
		console.log('newInitialValues uname', newInitialValues.upassword);
	};

	const newInitialValues = {
		uemail: userData && Object.keys(userData).length > 0 ? userData.email : '',
		upassword: userData && Object.keys(userData).length > 0 ? userData.password : '',
	};
	console.log('newInitialValues', newInitialValues);
	console.log('newInitialValues uname', newInitialValues.uname);

	const handleMobileNumberChange = (event, setFieldValue) => {
		event.preventDefault();
		let { value, name } = event.target;
		value = numberFieldValidation(value);
		setFieldValue(name, value);
		console.log('value', value);
		console.log('setFieldValue', setFieldValue);
	};

	return (
		<div className="requestCallWrapper">
			<Row>
				<Col xs={12} md={5} className="callBackBg"></Col>
				<Col xs={12} md={7} className="">
					<h3>Log in to Your Account</h3>
					<Formik initialValues={initialValues} validationSchema={validateRequestCallBack} onSubmit={handleSubmitEvent}>
						{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
							return (
								<FormikForm>
									{console.log('errors', errors)}
									<Form.Group controlId="mobile_no">
										<Form.Control
											type="text"
											name="mobile_no"
											placeholder="Mobile Number *"
											onChange={handleChange}
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
									<Form.Group controlId="password">
										<Form.Control
											type="password"
											placeholder="Password *"
											onChange={handleChange}
											value={values.password}
											isInvalid={errors.password && touched.password}
										/>
										{errors.password && touched.password ? <p className="error no-pos"> {errors.password}</p> : null}
									</Form.Group>
									{errors.message ? (
										<Row>
											<Col xs={12} sm={12} md={12}>
												<span className="errorMsg">{errors.message}</span>
											</Col>
										</Row>
									) : null}
									<Button variant="primary" className="btn btnRed" type="submit">
										submit
									</Button>
								</FormikForm>
							);
						}}
					</Formik>
				</Col>
			</Row>
		</div>
	);
};

export default LogIn;