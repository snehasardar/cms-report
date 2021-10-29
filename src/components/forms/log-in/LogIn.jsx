import { Formik, Form as FormikForm } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';

import '../registration/registration.styles.css';
import '../styles.css';

import { logIn } from '../../../actions/signup.action';

const initialValues = {
	email: '',
	password: '',
};
console.log('initialValues', initialValues);

const LogIn = (props) => {
	const { logged, setLogged } = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const { userData } = useSelector((state) => state.registration);
	console.log(' userData', userData);

	const validateRequestCallBack = Yup.object().shape({
		email: Yup.string().trim().email('Enter valid Email Id').required('Please enter Email Id'),
		password: Yup.string().trim().required('Please enter Password'),
	});

	const handleSubmitEvent = (values, actions) => {
		let postdata = {
			email: values.email,
			password: values.password,
		};
		console.log(' login password', values.password);
		console.log(' login email', values.email);
		dispatch(logIn(postdata));
		setLogged(true);
		history.push('/home');
	};

	const newInitialValues = {
		uemail: userData && Object.keys(userData).length > 0 ? userData.email : '',
		upassword: userData && Object.keys(userData).length > 0 ? userData.password : '',
	};
	console.log('  newInitialValues uemail', newInitialValues.uemail);
	console.log('  newInitialValues uemail', newInitialValues.upassword);

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
									<Form.Group controlId="email">
										<Form.Control
											type="text"
											placeholder="Email Id *"
											name="email"
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
										LogIn
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
