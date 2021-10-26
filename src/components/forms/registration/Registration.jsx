import { Formik, Form as FormikForm } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';

import './registration.styles.css';
import '../styles.css';

import { GENDERS_FORM, REGEX_FULL_NAME } from '../../../shared/constants';
import { numberFieldValidation, selectGender } from '../../../shared/common';

import { signUp } from '../../../actions/signup.action';

const initialValues = {
	name: '',
	mobile_no: '',
	email: '',
	password: '',
	gender: '',
	terms_of_service: false,
};
console.log('initialValues', initialValues);

const Registration = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const validateRequestCallBack = Yup.object().shape({
		name: Yup.string()
			.trim()
			.min(1, 'Name cannot be less than 1 character long')
			.max(40, 'Name cannot be more than 40 characters long')
			.required('Please enter your Name')
			.test('name', "Name supports only alphabets and some other characters. ('.)", (value) => value && value.match(REGEX_FULL_NAME)),
		mobile_no: Yup.string()
			.min(10, 'Mobile number must have minimum 10 digits')
			.max(10, 'Mobile number must have maximum 10 digits')
			.trim()
			.required('Please enter your Mobile Number')
			.matches('^[0-9]+$', 'Mobile number should be numbers'),
		email: Yup.string().trim().email('Enter valid Email Id').required('Please enter Email Id'),
		password: Yup.string().trim().required('Please enter Password'),
		gender: Yup.object().required('Please select Gender'),
		terms_of_service: Yup.boolean().oneOf([true], 'Please agree to the Terms of Use and Privacy Policy'),
	});

	const handleSubmitEvent = (values, actions) => {
		let post_data = {
			name: values.name,
			mobile_no: values.mobile_no,
			email: values.email,
			password: values.password,
			gender: values.gender.value,
		};
		dispatch(signUp(post_data));
		history.push('/logIn');
	};

	const handleMobileNumberChange = (event, setFieldValue) => {
		event.preventDefault();
		let { value, name } = event.target;
		value = numberFieldValidation(value);
		setFieldValue(name, value);
	};

	return (
		<div className="requestCallWrapper">
			<Row>
				<Col xs={12} md={5} className="callBackBg"></Col>
				<Col xs={12} md={7} className="">
					<h3>Register to your Account</h3>
					<Formik initialValues={initialValues} validationSchema={validateRequestCallBack} onSubmit={handleSubmitEvent}>
						{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
							//callbacks
							return (
								<FormikForm>
									{console.log('errors', errors)}
									<Form.Group controlId="name">
										<Form.Control
											type="text"
											placeholder="Name *"
											onChange={handleChange}
											value={values.name}
											isInvalid={errors.name && touched.name}
										/>
										{errors.name && touched.name ? <p className="error no-pos"> {errors.name}</p> : null}
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
									<Form.Row>
										<Form.Group as={Col} sm="6" controlId="gender">
											<Select
												options={GENDERS_FORM}
												className="basic-select"
												classNamePrefix="select"
												getOptionValue={(x) => x.value}
												getOptionLabel={(x) => x.label}
												onChange={(evt) => setFieldValue('gender', evt)} //set variable gender in formik state
												defaultValue={values.gender}
												placeholder="Select Gender *"
											/>
											{errors.gender && touched.gender ? <p className="error no-pos"> {errors.gender}</p> : null}
										</Form.Group>
									</Form.Row>
									<Form.Group as={Col} md="12" className="text-left">
										<div className="form-check">
											<input
												name="terms_of_service"
												className="form-check-input mr-2"
												id="bookhc-agreement"
												type="checkbox"
												onChange={handleChange}
											/>
											<label htmlFor="bookhc-agreement">I agree to the</label>
											<span className="pointer mr-2 ml-2 text-primary" onClick={() => null}>
												Terms of Use
											</span>
											<label htmlFor="bookhc-agreement">and </label>
											<span className="pointer ml-2 text-primary" onClick={() => null}>
												Privacy Policy
											</span>
											{errors.terms_of_service && touched.terms_of_service ? (
												<p className="errorMsg no-pos"> {errors.terms_of_service}</p>
											) : null}
										</div>
									</Form.Group>
									{errors.message ? (
										<Row>
											<Col xs={12} sm={12} md={12}>
												<span className="errorMsg">{errors.message}</span>
											</Col>
										</Row>
									) : null}
									<Button variant="primary" className="btn btnRed" type="submit" disabled={isSubmitting}>
										{isSubmitting ? 'Sending Request' : 'Send Request'}
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

export default Registration;
