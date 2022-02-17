import { Formik, Form as FormikForm } from 'formik';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Select from 'react-select';
import { toast } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';

import '../registration/registration.styles.css';
import '../customer-home/customerModal.styles.css';
import '../styles.css';

import { STATUS_FORM } from '../../../shared/constants';
import { numberFieldValidation,  selectStatus } from '../../../shared/common';

import { editBook } from '../../../actions/books.action';

const initialValues = {
	book_name: '',
	author_name: '',
	genre: '',
	total_books: '',
	price: '',
	status: '',
};

const BooksEdit = (props) => {
	const { bookEditModal, setBookEditModal } = props;
	const { id } = props;
	const { bookList } = useSelector((state) => state.booksReducer);
	const dispatch = useDispatch();
	const history = useHistory();

	const currentBook = bookList.find((item) => item.id == id);

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
		genre: Yup.string()
			.trim()
			.min(1, 'Genre cannot be less than 1 character long')
			.max(40, 'Genre cannot be more than 40 characters long')
			.required('Please enter Book Genre'),
		total_books: Yup.string()
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
		status: Yup.object().required('Please select status'),
	});
	const newInitialValues = Object.assign(initialValues, {
		book_name: currentBook && Object.keys(currentBook).length > 0 ? currentBook.book_name : '',
		image_link: currentBook && Object.keys(currentBook).length > 0 ? currentBook.image_link : '',
		author_name: currentBook && Object.keys(currentBook).length > 0 ? currentBook.author_name : '',
		genre: currentBook && Object.keys(currentBook).length > 0 ? currentBook.genre : '',
		total_books: currentBook && Object.keys(currentBook).length > 0 ? currentBook.total_books : '',
		price: currentBook && Object.keys(currentBook).length > 0 ? currentBook.price : '',
		status: currentBook && Object.keys(currentBook).length > 0 ? selectStatus(currentBook.status) : '',
	});

	const handleSubmitEvent = (values, actions) => {
		let post_data = {
			id: currentBook && Object.keys(currentBook).length > 0 ? currentBook.id : '',
			image_link: values.image_link,
			book_name: values.book_name,
			author_name: values.author_name,
			genre: values.genre,
			reference_num: currentBook && Object.keys(currentBook).length > 0 ? currentBook.reference_num : '',
			total_books: values.total_books,
			price: values.price,
			status: values.status.value,
			added_date: currentBook && Object.keys(currentBook).length > 0 ? currentBook.added_date : '',
			updated_date: new Date().toLocaleString(),
		};

		dispatch(editBook(post_data));
		toast('Book information has been successfully edited');
		// console.log('post_data', post_data);
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
	};

	return (
		<Modal className="requestCallModal" show={bookEditModal} onHide={() => setBookEditModal(false)} backdrop="static" centered>
			<Modal.Header closeButton onClick={handleClose}>
				<Modal.Title>Edit Book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="requestCallWrapper">
					<Row>	
						<Col xs={12} md={7} className="">
							{/* <h3>Edit Books here</h3> */}
							<Formik initialValues={newInitialValues} validationSchema={validateBooksInformation} onSubmit={handleSubmitEvent}>
								{({ values, errors, handleChange, isSubmitting, setFieldValue, touched }) => {
									return (
										<FormikForm>
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
											<Form.Group controlId="image_link">
												<Form.Control
													type="link"
													placeholder="Image-Link *"
													onChange={handleChange}
													value={values.image_link}
													isInvalid={errors.image_link && touched.image_link}
												/>
												{errors.image_link && touched.image_link ? <p className="error no-pos"> {errors.image_link}</p> : null}
											</Form.Group>
											<Form.Group controlId="author_name">
												<Form.Control type="text" placeholder="Author-Name *" onChange={handleChange} value={values.author_name} />
												{errors.author_name && touched.author_name ? <p className="error no-pos"> {errors.author_name}</p> : null}
											</Form.Group>
											<Form.Group controlId="genre">
												<Form.Control
													type="text"
													placeholder="Genre of the Book *"
													onChange={handleChange}
													value={values.genre}
													isInvalid={errors.genre && touched.genre}
												/>
												{errors.genre && touched.genre ? <p className="error no-pos"> {errors.genre}</p> : null}
											</Form.Group>
											<Form.Group controlId="total_books">
												<Form.Control
													type="number"
													name="total_books"
													placeholder="Number of Books*"
													value={values.total_books}
													onChange={(e) => handleMobileNumberChange(e, setFieldValue)}
													isInvalid={errors.total_books && touched.total_books}
												/>
												{errors.total_books && touched.total_books ? <p className="error no-pos"> {errors.total_books}</p> : null}
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

export default BooksEdit;

/*

			
			*/
