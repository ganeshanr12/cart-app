import React, { Component } from 'react';

class SearchProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
    }

    searchFilter = (e) => {
        e.preventDefault(); 
        return this.props.searchFilter(this.state.searchText)
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return (
            <form className="form-inline my-2 my-md-0" onSubmit={(e) => this.searchFilter(e)}>
                <span className="search-component">
                <input className="form-control" name="searchText" type="text" placeholder="Search" onChange={this.handleChange} value={this.state.searchText}/>
                <i className="fas fa-search"  onClick={(e) => this.searchFilter(e)}></i>
                </span>                                              
            </form>
        );
    }
}

export default SearchProduct;