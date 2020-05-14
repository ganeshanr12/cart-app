import React, { Component } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../styles/RangeSlider.scss';

class Filter extends Component {
    
    constructor(props) {
        super(props);
        this.state = { sliderValues: [100, 100000] };
        this.filter = this.filter.bind(this);
    }

    handleChange = sliderValues => {
        this.setState({ sliderValues });        
    };

    filter = () => {
        this.props.applyFilter(this.state.sliderValues);
    }
    
    render() {
        const { sliderValues } = this.state;
        return (
            <div className="filter-container">
                <h3 className="header-primary">Filters</h3>              
                <span className="filter-price-start">{'₹' + sliderValues[0]}</span> <span className="filter-price-end">{'₹' + sliderValues[1]}</span>
                 <Range 
                    min={100}
                     max={100000}
                    allowCross={false}                   
                    defaultValue={sliderValues}
                    onChange={this.handleChange}
                />
                <span className="filter-price-text">Price</span>
                <div className="text-center"><button className="btn-main" onClick={this.filter}>Apply</button></div>
            </div>
        );
    }
}

export default Filter;