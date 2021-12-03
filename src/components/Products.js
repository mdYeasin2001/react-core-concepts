import React from 'react';
import Product from './Product';

const Products = () => {
    const fakeProducts = [
        {
            id: 101,
            name: "iPhone X Max",
            price: 2600,
        },
        {
            id: 102,
            name: "Walton GH4",
            price: 200,
        },
        {
            id: 103,
            name: "Samsung M20",
            price: 1200,
        },
    ];
    return (
        <div>
            {fakeProducts.map(product => <Product key={product.id} data={product} />)}
        </div>
    );
};

export default Products;