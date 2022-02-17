import { Formik, Form as FormikForm } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import '../registration/registration.styles.css';
import '../styles.css';

import { logIn } from '../../../actions/signup.action';

const initialValues = {
	email: '',
	password: '',
};

const LogIn = (props) => {
	// const { logged, setLogged } = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const { userData } = useSelector((state) => state.registration);

	const validateRequestCallBack = Yup.object().shape({
		email: Yup.string().trim().email('Enter valid Email Id').required('Please enter Email Id'),
		password: Yup.string().trim().required('Please enter Password'),
	});

	const handleSubmitEvent = (values, actions) => {
		let postdata = {
			email: values.email,
			password: values.password,
		};
		console.log('postdata',postdata);
		
		const user = userData.find((item) => item.email === values.email);
		if (user && Object.keys(user).length > 0) {
			if (user.password === values.password) {
				toast.success('successfully login');
				dispatch(logIn());
				history.push('/home');
			} else {
				toast.warning('Invalid credential');
			}
		} else {
			toast.warning('Invalid credential');
		}
	};

	const handleEmailChange = (e, setFieldValue) => {
		e.preventDefault();
		let { value, name } = e.target;
		setFieldValue(name, value);
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
									<Form.Group controlId="email">
										<Form.Control
											type="text"
											name="email"
											placeholder="Email Id *"
											value={values.email}
											onChange={(e) => handleEmailChange(e, setFieldValue)}
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
