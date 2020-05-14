import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddCart from './AddCart';
import SearchProduct from './SearchProduct';

class Header extends Component {
   
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand navbar-dark nav-bg">
                    <Link className="navbar-brand" to={'/'}><i className="fas fa-star"></i></Link>                

                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"></li>
                        </ul>
                        <SearchProduct  searchFilter={this.props.searchFilter} />                  
                        <AddCart updateCartItems={this.props.updateCartItems}  cartItems={this.props.cartItems}/> 
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;