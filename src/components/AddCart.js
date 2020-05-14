import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddCart extends Component {


    getCartCount = () => {
        let total = 0;
        this.props.cartItems.map((item) => {
            return total = total + item.quantity;
        } ) 
        return total;
    }

    render() {
        return (
             <Link className="cart-section" to={{ pathname: '/cart', cartItems: this.props.cartItems, updateCartItems: this.props.updateCartItems }}><i className="fas fa-shopping-cart"></i>
                {(this.getCartCount() !== 0 ) && <span className="cart-count">{this.getCartCount()}</span> }             
            </Link>
        );
    }
}

export default AddCart;