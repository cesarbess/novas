import React, { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class SearchFilter extends Component {
  constructor(props){
    super(props);
    this.filterItens = props.filterItens.map((item, index) => {
      return <MenuItem eventKey={index} onSelect={this.props.onFilterSelect}>{item}</MenuItem>
    });
  };

  render() {
    return (
      <div className= "filter-container">
        <ButtonToolbar>
          <DropdownButton title={this.props.filterName} id="dropdown-size-medium">
            {this.filterItens}
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default SearchFilter;
