import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../customer-home/Sidebar';
import Pagination from 'react-js-pagination';

import { addToCart } from '../../../actions/product.action';


const ProductsList = (props) => {
    const { logged, setLogged } = props;
    const { bookList } = useSelector((state) => state.booksReducer);
    console.log('booklist',bookList);
    const dispatch = useDispatch();
    const [searchByName, setSearchByName] = useState('');
	const [searchByAuthor, setSearchByAuthor] = useState('');
	const [filterdBookList, setFilterdBookList] = useState('');

	const [itemsCountPerPage, setItemsCountPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const totalData = bookList.length;
	const lastData = activePage * itemsCountPerPage;
	const firstData = lastData - itemsCountPerPage;

    let updatedBookList = [];
            let i = 0;
            while(i < bookList.length){
                console.log("hello guys 1")
                if(bookList[i].status == 1){
                    console.log("hello guys 2")
                    let newBookList= bookList[i]
                    console.log('bookList[i].status',bookList[i])
                    console.log('newBookList', newBookList)
                    updatedBookList.push(newBookList);
                }
                i= i + 1; 
            }
        // console.log('bookList[i]',bookList[0].status)
        console.log('updatedBookList', updatedBookList)

    const handleSearchByName = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log('name ', name);
		console.log('value', value);
		if (value && name === 'name_search') {
			let newData = [];
			updatedBookList.filter((data) => {
				if (data.book_name.toLowerCase().includes(value.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setSearchByName(value);
			setFilterdBookList(newData);
		} else if (value && name === 'email_search') {
			let newData = [];
			updatedBookList.filter((data) => {
				if (data.author_name.toLowerCase().includes(searchByAuthor.toLowerCase())) {
					newData.push(data);
					console.log('data', data);
				} else if (
					data.book_name.toLowerCase().includes(searchByName.toLowerCase()) &&
					data.author_name.toLowerCase().includes(searchByAuthor.toLowerCase())
				) {
					newData.push(data);
					console.log('data', data);
				}
			});
			setFilterdBookList(newData);
		} else {
			setFilterdBookList(updatedBookList);
			setSearchByName('');
			setSearchByAuthor('');
		}
	};

    const showBookList = (start, end) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setFilterdBookList(updatedBookList);
		}, 1000);
	};

	useEffect(() => {
		setFilterdBookList(updatedBookList);
	}, [bookList]);


	useEffect(() => {
		showBookList(firstData, lastData);
		console.log('activepage', activePage);
	}, [activePage]);

	console.log('isLoading', isLoading);
    return(
        <div className='container'>
            <Sidebar />
                 <div >
                 <h5>Shop now </h5>
                 <input placeholder="Search by Book Name" name="name_search" value={searchByName} onChange={handleSearchByName} />{' '}
				<input placeholder="Search by Author Name" name="email_search" value={searchByAuthor} onChange={handleSearchByName} />{' '}
                <button >
					<Link to={`/productsListCart`}>Check Your Cart</Link>
				</button>
                {!isLoading ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Image</th>
								<th>Book Name</th>
								<th>Author Name</th>
								<th>Genre</th>
								<th>Stock </th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{filterdBookList &&
								filterdBookList.length > 0 &&
								filterdBookList.slice(firstData, lastData).map((data, index) => {
									return (
										<tr key={index}>
											<td>
												<img src={data.image_link} alt="book image" width="50" height="50" />{' '}
											</td>
											<td>{data.book_name}</td>
											<td>{data.author_name}</td>
											<td>{data.genre}</td>
											<td>{data.total_books}</td>
											<td>₹{data.price}</td>
											<td>
											<button className="btn btn-primary" onClick={() => dispatch(addToCart(data))}>Add to cart</button>
											</td>
											
										</tr>
									);
								})}
						</tbody>
					</Table>
				) : (
					<div>Loading...</div>
				)}
				{bookList.length >= itemsCountPerPage ? (
					<Pagination linkClass="page-link" linkClass="page-link"
						activePage={activePage}
						itemsCountPerPage={itemsCountPerPage}
						totalItemsCount={totalData}
						pageRangeDisplayed={pageRangeDisplayed}
						onChange={(currentPage) => setActivePage(currentPage)}
					/>
				) : (
					' '
				)}
                </div> 
            </div>
    )

}
export default ProductsList;



/* <p>Stock: {item.total_books} </p> 
{
                            (logged== true) ? <button className="btn btn-primary" >
                               Add to cart</button> : ' '
                           } */
/* <ul className="list-group list-group-flush">
                    {
                        bookList.map( (item, index) => {
                            return(   
                            <li className="list-group-item" key={index}>
                            <h5>Book Name: {item.book_name}</h5>
                            <p>Author Name: {item.author_name}</p>
                            <p>Price: ₹{item.price}</p>
                            <button className="btn btn-primary" >
                               Add to cart</button>
                            </li>
                            )
                        })
                    }
                    </ul> */