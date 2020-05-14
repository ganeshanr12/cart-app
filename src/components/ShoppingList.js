import React, { Component } from 'react';

class ShoppingList extends Component {   
    
    renderItems = () => {        
       return this.getItemTemplate(this.props.items);      
    }

    addCart = (id) => {
       this.props.addCart(id);
    }

    getItemTemplate = (itemsObjArr) => {
        return (
            itemsObjArr.map((itemsObj, index) => {
                return (
                    <div className="card" key={index}>                   
                        <img className="img-fluid card-img-top" src={itemsObj.image} alt="Card cap" />
                        <div className="card-block"><p className="card-title">{itemsObj.name}</p>
                            <p className="card-text">₹{itemsObj.price.actual} <span className="strike">{itemsObj.price.display}</span> <span className="discount">{itemsObj.discount }% off</span></p>
                            <div className="button-container"><span className="btn btn-primary btn-add-cart" onClick={()=>{ this.addCart(itemsObj.id) }}>Add to cart</span></div>
                        </div>
                </div>
                )
            })            
        );        
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row listProduct"> { this.renderItems() }</div>
            </div>
        );
    }
}

export default ShoppingList;