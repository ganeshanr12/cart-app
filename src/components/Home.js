import React, { Component } from 'react';
import Filter from './Filter';
import Sorting from './Sorting';
import ShoppingList from './ShoppingList';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sortType: 'desc',
      sliderValues: [100, 100000]
    }
    this.handleChange = this.handleChange.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      sortType: e.target.value
    });
  }

  sliderChange = sliderValues => {
      this.setState({ sliderValues });        
  };

  filter = () => {
      this.props.applyFilter(this.state.sliderValues);
  }

    render() {
      const { sliderValues } = this.state;
        return (
            <main>
                <div className="homecomponent">
                <div className="top-banner">
                    <div className="mb-sorting"  data-toggle="modal" data-target="#sortModal">
                    <i className="fas fa-sort"></i>
                    Sort
                    </div>
                    <div className="mb-filter"  data-toggle="modal" data-target="#filterModal">
                    <i className="fas fa-filter"></i>
                    Filter
                    </div>
                </div>
    
                <aside>
                    <Filter applyFilter={this.props.applyFilter}/>
                </aside>
                <section className="contect-section">
                    <Sorting items={this.props.items} sortItems={this.props.sortItems} />        
                    <ShoppingList items={this.props.items} addCart={this.props.addCart}/>       
                </section>
                </div>
              {/* Sort Modal */}
              <div className="modal fade" id="sortModal" tabIndex="-1" role="dialog" aria-labelledby="sortModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="sortModalLabel">Sort Options</h5>        
                  </div>
                  <div className="modal-body">
                  <div className="radio">
                    <label><input type="radio" name="" value="desc" checked={this.state.sortType === 'desc'}  onChange={this.handleChange}/> Price -- High Low</label>
                  </div>
                  <div className="radio">
                    <label><input type="radio" value="asc"  checked={this.state.sortType === 'asc'}  onChange={this.handleChange} /> Price -- Low High</label>
                  </div>
                  <div className="radio">
                    <label><input type="radio"  value="discount"  checked={this.state.sortType === 'discount'}  onChange={this.handleChange}/> Discount</label>
                  </div>
                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn modal-button" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn modal-button" onClick={() => this.props.sortItems(this.state.sortType)}>Apply</button>
                  </div>
                </div>
              </div>
              </div>
              {/* Filter Modal */}
              <div className="modal fade" id="filterModal" tabIndex="-1" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="filterModalLabel">Filter Options</h5>       
                  </div>
                  <div className="modal-body">
                    <section className="range-slider">
                      <span className="rangeValues"></span>
                      {'₹' + sliderValues[0]} - {'₹' + sliderValues[1]}
                      <Range 
                          min={100}
                          max={100000}
                          allowCross={false}                   
                          defaultValue={sliderValues}
                          onChange={this.sliderChange}
                      />
                    </section>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn modal-button" data-dismiss="modal">Close</button>
                    <button type="button" className="btn modal-button" onClick={this.filter}>Apply</button>
                  </div>
                </div>
              </div>
              </div>

            </main>
            
        );
    }
}

export default Home;