import React, { Component } from 'react';

class Sorting extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortType: ''
        }
        this.sortItems = this.sortItems.bind(this);
    }

    sortItems = (sortType) => {
        this.setState({sortType: sortType});
        return this.props.sortItems(sortType)
    }

    render() {
        return (
            <div className="sorting-container">
                <h3 className="header-primary">Sort By</h3>
                <span className={(this.state.sortType === 'desc') ? "sorting-type active" : "sorting-type"} onClick={() => this.sortItems('desc') }>Price -- High Low</span>
                <span className={(this.state.sortType === 'asc') ? "sorting-type active" : "sorting-type"} onClick={() => this.sortItems('asc') }>Price -- Low High</span>
                <span className={(this.state.sortType === 'discount') ? "sorting-type active" : "sorting-type"} onClick={() => this.sortItems('discount') }>Discount</span>
            </div>
        );
    }
}

export default Sorting;