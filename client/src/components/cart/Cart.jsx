import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import classes from './cart.module.css'
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartContext } from '../../ctx/cartContext'

const Cart = () => {
    const { products, toggleCart, isOpen, removeProduct } = useCartContext()

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)


    const handleCheckout = async () => {

        const lineItems = products.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 // because stripe interprets price in cents
                },
                quantity: item.quantity
            }
        })

        const { data } = await axios.post('http://localhost:5000/checkout', { lineItems })

        const stripe = await stripePromise

        await stripe.redirectToCheckout({ sessionId: data.id })
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.cartIcon} onClick={toggleCart}>
                    <AiOutlineShoppingCart size={25} />
                    <span className={classes.cartNumber}>
                        {products?.length}
                    </span>
                </div>
                {isOpen &&
                    <div className={classes.cartContainer}>
                        {products?.length > 0 ? (
                            <>
                                <h4>Products</h4>
                                <div className={classes.productContainer}>
                                    {products.map((product) => (
                                        <div className={classes.product} key={product.id}>
                                            <img src={product.img} alt="" />
                                            <div className={classes.productDetails}>
                                                <h3>{product.name}</h3>
                                                <span>{product.quantity} x ${product.price}</span>
                                            </div>
                                            <AiOutlineClose onClick={() => removeProduct(product)} />
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.controls}>
                                    <button onClick={handleCheckout}>Checkout</button>
                                    <span onClick={toggleCart}>Close cart</span>
                                </div>
                            </>
                        ) : (<h3>No products in cart</h3>)}
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart