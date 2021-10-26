import { Formik, Form as FormikForm } from 'formik';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
// import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';

import '../registration/registration.styles.css';
import '../customer-home/customerModal.styles.css';
import '../styles.css';

import { GENDERS_FORM, REGEX_FULL_NAME, INITIAL_FORM, STATUS_FORM } from '../../../shared/constants';
import { numberFieldValidation, selectInitial, selectStatus } from '../../../shared/common';

import { addBook } from '../../../actions/books.action';

const initialValues = {
	book_name: '',
	author_name: '',
	language: '',
	no_of_books: '',
	price : '',
};
console.log('initialValues', initialValues);

const BooksAdd = (props) => {
	const { bookModal, setBookModal } = props;
	console.log('bookModal',bookModal);
	console.log('setBookModal',setBookModal);
	// const { bookList } = useSelector((state) => state.booksCart);
	const dispatch = useDispatch();
	const history = useHistory();

	const validateBooksInformation = Yup.object().shape({
		book_name: Yup.string()
			.trim()
			.min(1, 'Book Name cannot be less than 1 character long')
			.max(40, 'Book Name cannot be more than 40 characters long')
			.required('Please enter Book Name'),
		author_name: Yup.string()
			.trim()
			.min(1, 'Author Name cannot be less than 1 character long')
			.max(40, 'Author Name cannot be more than 40 characters long')
			.required('Please enter Author Name'),
		// publisher_name: Yup.string()
		// 	.trim()
		// 	.min(1, 'Publisher Name cannot be less than 1 character long')
		// 	.max(40, 'Publisher Name cannot be more than 40 characters long')
		// 	.required('Please enter Books Publisher  Name'),
		language: Yup.string()
			.trim()
			.min(1, 'Book Name cannot be less than 1 character long')
			.max(40, 'Book Name cannot be more than 40 characters long')
			.required('Please enter Book Name'),
		no_of_books: Yup.string()
			.min(1, 'number of books must have minimum 1 digits')
			.max(10, 'number of books must have maximum 10 digits')
			.trim()
			.required('Please enter number of books')
			.matches('^[0-9]+$', 'number of books should be numbers'),
		price: Yup.string()
			.min(1, 'number of books must have minimum 1 digits')
			.max(10, 'number of books must have maximum 10 digits')
			.trim()
			.required('Please enter number of books')
			.matches('^[0-9]+$', 'number of books should be numbers'),
	});

	const handleSubmitEvent = (values, actions) => {
		let post_data = {
			book_name: values.book_name,
			author_name: values.author_name,
			publisher_name: values.publisher_name,
			language: values.language,
			no_of_books: values.no_of_books,
			price : values.price,
		};

		dispatch(addBook(post_data));
		console.log('post_data', post_data);
		history.push('/booksDetails');
	};

	const handleMobileNumberChange = (event, setFieldValue) => {
		event.preventDefault();
		let { value, name } = event.target;
		value = numberFieldValidation(value);
		setFieldValue(name, value);
	};
	const handleClose = () => {
		history.push('/booksDetails');
	}

	return (
		<Modal className="requestCallModal" show={bookModal} onHide={() => setBookModal(false)} backdrop="static" centered>
			<Modal.Header closeButton  onClick={ handleClose }></Modal.Header>
			<Modal.Body>
				<div className="requestCallWrapper">
					<Row>
						<Col xs={12} md={5} className="callBackBg"></Col>
						<Col xs={12} md={7} className="">
							<h3>Add Customer here</h3>
							<Formik initialValues={initialValues} validationSchema={validateBooksInformation} onSubmit={handleSubmitEvent}>
								{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
									return (
										<FormikForm>
											{console.log('errors', errors)}
											<Form.Group controlId="book_name">
												<Form.Control
													type="text"
													placeholder="Book-Name *"
													onChange={handleChange}
													value={values.book_name}
													isInvalid={errors.book_name && touched.book_name}
												/>
												{errors.book_name && touched.book_name ? <p className="error no-pos"> {errors.book_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="author_name">
												<Form.Control type="text" placeholder="Author-Name *" onChange={handleChange} value={values.author_name} />
												{errors.author_name && touched.author_name ? <p className="error no-pos"> {errors.author_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="language">
												<Form.Control
													type="text"
													placeholder="Language of the Book *"
													onChange={handleChange}
													value={values.language}
													isInvalid={errors.language && touched.language}
												/>
												{errors.language && touched.language ? <p className="error no-pos"> {errors.language}</p> : null}
											</Form.Group>
											<Form.Group controlId="no_of_books">
												<Form.Control
													type="number"
													name="no_of_books"
													placeholder="Number of Books*"
													value={values.no_of_books}
													onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
													isInvalid={errors.no_of_books && touched.no_of_books}
												/>
												{errors.no_of_books && touched.no_of_books ? <p className="error no-pos"> {errors.no_of_books}</p> : null}
											</Form.Group>
											<Form.Group controlId="price">
												<Form.Control
													type="text"
													name="price"
													placeholder="price of the Book*"
													value={values.price}
													onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
													isInvalid={errors.price && touched.price}
												/>
												{errors.price && touched.price ? <p className="error no-pos"> {errors.price}</p> : null}
											</Form.Group>
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

export default BooksAdd;

/*

			
			*/
