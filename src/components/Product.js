import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

const Product = ({ data }) => {
    const dispatch = useDispatch();
    return (
        <div style={{ border: '1px solid black', margin: "10px", padding: "10px" }}>
            <h4>{data.name}</h4>
            <h5>$ {data.price}</h5>
            <button onClick={() => dispatch(addToCart(data))}>add to cart</button>
        </div>
    );
};

export default Product;