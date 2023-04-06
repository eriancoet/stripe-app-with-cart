import React from 'react'
import { useCartContext } from '../../ctx/cartContext'
import { products } from '../../data/data'
import classes from './productItem.module.css'

const Products = () => {
    const { addProduct } = useCartContext()


    return (
        <div className={classes.container}>
            {products.map((product) => (
                <div className={classes.product} key={product.id}>
                <img src={product.img} alt="" />
                <div className={classes.productDetails}>
                    <h3>{product.name}</h3>
                    <span>${product.price}</span>
                </div>
                <button onClick={() => addProduct(product)}>Add to cart</button>
            </div>
            ))}
        </div>
    )
}

export default Products