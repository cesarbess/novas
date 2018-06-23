import React from 'react';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';

const FilterTag = (props) => {
  return (
    <div className='filter-tag-item'>
      <Label>{props.filterName}</Label>
        <Button
        className='filter-tag-button'
        bsSize='xs'
        bsStyle='link'
        onClick = {props.onFilterClosed}>
        x
        </Button>
    </div>
  );
}

export default FilterTag;
