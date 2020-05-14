import React, { Component } from 'react';

class Cart extends Component {

    constructor(props){
        super(props);
        let cartItems = ( this.props.location.cartItems === undefined) ? [] : this.props.location.cartItems;
        this.state = {
            cartItems: cartItems
        }
        this.updateCartItems = this.updateCartItems.bind(this)
    }

    removeItem = (id) => {  
        let cartItems = this.state.cartItems;  
        cartItems.map((item, index) => {
           if(item.id === id) {
             item.quantity=0; 
             cartItems.splice(index, 1);
           } 
           return this.setState({ cartItems : cartItems });
        })
        return this.props.location.updateCartItems(cartItems);
     }

    updateCartItems = (itemId, action='addItem') => {
        let cartItems = this.state.cartItems;  
        
        if(cartItems.length !== 0) {      
            cartItems.map((item, index) => {
                if(item.id === itemId){
                    if(action === 'addItem') {
                        item.quantity++;
                    }
                    else{
                        item.quantity--;
                        if(item.quantity <= 0) {
                            cartItems.splice(index, 1);
                        }
                    }                    
                }
                return this.setState({ cartItems: [...cartItems] });
            })           
        }
        return this.props.location.updateCartItems(cartItems);
    }

    renderCartItems = () => {
        let cartItems = this.state.cartItems;     
        let priceItemTotal = 0;
        let pricediscount = 0;
        return (
            (cartItems.length !== 0 ) ?
                <div>
                    <div className="cartitem-container">
                        {
                        cartItems.map((product, index) => {
                            priceItemTotal = priceItemTotal + (product.price.display * product.quantity);
                            pricediscount = pricediscount + (this.getDiscountAmount(product.price.actual, product.price.display) * product.quantity);
                            return (
                                <div className="cartCard" key={index}>
                                <div className="product-image">
                                    <img className="img-fluid" src={product.image} alt="Card cap"></img> 
                                </div>
                                <div className="product-desc">
                                    <span className="product-info">
                                        <p className="card-title">{product.name }</p>
                                        <p className="card-text">₹ {product.price.actual} <span className="strike">{product.price.display}</span> <span className="discount">{ product.discount } off</span></p>
                                    </span>
                                    <span className="product-counter"> <div className="input-group">
                                        <button className="minus-item btn-circle" onClick={() => this.updateCartItems(product.id, 'remove')} >-</button>
                                        <span className="item-count" >{product.quantity}</span>
                                        <button className="plus-item btn-circle" onClick={() => this.updateCartItems(product.id)} >+</button>
                                        </div>
                                    </span>
                                    <span className="product-cancel">
                                        <span className="btn btn-remove" onClick={() => this.removeItem(product.id)}>REMOVE</span>
                                    </span>
                                </div>
                            </div>
                            )
                        })
                        }
                    </div>
                    <div className="priceDetails">
                        <h3 className="header-primary">PRICE DETAILS</h3>
                        <p>Price <span>: ₹{priceItemTotal}</span></p>  
                        <p>Discount <span>: ₹{pricediscount}</span></p>
                        <div className="total">Total Payable <span>₹ { priceItemTotal - pricediscount }</span></div>
                    </div>
                </div> : <div className="no-items"> <p>Your cart is empty !!!</p><i class="fas fa-shopping-cart"></i></div>
        );
    }

    getDiscountAmount = (actual, display) => {
        return (display-actual);
    }

    render() { 
        return (
            <div className="viewcart">
                { this.renderCartItems() }
            </div>
        );
    }
}

export default Cart;