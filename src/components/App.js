import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../styles/App.scss';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Cart from './Cart';
import {items} from '../data/cart';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: items,
      cartItems: [],
      searchItems: [],
      searchFlag: false
    }

    this.addCart = this.addCart.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.updateCartItems = this.updateCartItems.bind(this);
  }

  addCart = (itemId) => {
    let cartItems = this.state.cartItems;     
    this.state.items.filter((selItem) => {
      let updatedCartItems;
      if(selItem.id === itemId) {     
          selItem.quantity++;
          let alreadyExist = false;          
          if(cartItems.length !== 0) {      
            cartItems.map((item) => {
              return (item.id === selItem.id) ? alreadyExist = true: '';
            })  
          }
          updatedCartItems = (alreadyExist) ? [...cartItems] : [...cartItems, selItem];
          this.setState({ cartItems: updatedCartItems });       
      } 
      return '';      
    })
  }

  sortItems = (sortType) => {
    let sortedproducts = this.state.items;
    switch (sortType){
        case 'asc': 
            sortedproducts.sort((a,b) => {
            return  a.price.actual - b.price.actual; 
            })        
            break;
        case 'desc':
            sortedproducts.sort((a,b) => {
            return  b.price.actual - a.price.actual; 
            })        
            break;
        case 'discount':
            sortedproducts.sort((a,b) => {
            return  a.discount - b.discount; 
            })        
            break;   
        default: 
          break;       
    }
    this.setState({ searchItems: sortedproducts });   
  }

  searchFilter = (searchText) => {    
    let filterText = searchText.toUpperCase();
    if(filterText !== '') {
      let filteredproducts = this.state.items.filter(function(item){
        return (item.name.toUpperCase().indexOf(filterText) > -1);
      });
      this.setState({ searchFlag: true, searchItems: filteredproducts });   
    }
    else{
      this.setState({ searchFlag: false, searchItems: [] });   
    }
  }

  applyFilter = (sliderValues) => {   
    let filteredproducts = this.state.items.filter(function(item){
        return (item.price.actual >=  sliderValues[0] && item.price.actual <= sliderValues[1]);
    });    
    this.setState({ searchFlag: true, searchItems: filteredproducts });       
  }

  updateCartItems = (cartItems) => {
    this.setState({ cartItems }); 
  }


  render() {
    return (
      <div>
          <Header 
          cartItems={this.state.cartItems}  
          searchFilter={this.searchFilter}          
          updateCartItems={this.updateCartItems}
          /> 
          <Route exact path="/" render={(props) => 
              <Home items={ (this.state.searchFlag) ? this.state.searchItems : this.state.items}   
                    sortItems = {this.sortItems}                    
                    addCart={this.addCart}
                    applyFilter={this.applyFilter}
                    {...props}  /> 
              } />       
          <Route exact path="/cart" component={Cart} />       
        <Footer />
     </div>
    );
  }
}

export default App;