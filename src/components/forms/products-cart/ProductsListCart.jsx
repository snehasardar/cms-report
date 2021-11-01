import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { addQuantity, subtractQuantity, removeItem} from '../../../actions/product.action'

const ProductsListCart = () => {
    const { items }= useSelector((state) => state.productReducer);
	const dispatch = useDispatch();
	console.log('items', items);
	return (
		<div className='container'>
			<div>
				<h4>Your Add to Cart Items </h4>
				<Table>
                    <thead>
						<tr>
                        <th>Image</th>
							<th>Book Name</th>
							<th>Price</th>
                            <th>Quantity </th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{items?.map((product, index) => {
							return (
								<tr key={index}>
                                    <td>
										<img src={product.image_link} alt="book image" width="50" height="50" />{' '}
									</td>
                                    <td>{product.book_name}</td>
									<td>{product.price}</td>
									<td>{product.quantity}</td>
									<td>
										<button onClick={() => dispatch(addQuantity(product.id))}> + </button>
										<button onClick={() => dispatch(subtractQuantity(product.id))}> - </button>
										<button onClick={() => dispatch(removeItem(product.id))}> remove</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<div>
					<h4>Total :{items?.map((el) => el.quantity * el.price).reduce((acc, value) => (acc = acc + value), 0)}</h4>
				</div>
			</div>
		</div>
	);
};
export default ProductsListCart;
