import React from 'react';
import FilterTag from './filter_tag';

const FilterTags = (props) => {

  const filters = props.currentFilters.map((filter, index) => {
    return <FilterTag
      filterName= { props.currentFiltersNames[index] }
      onFilterClosed = { () => props.onFilterClosed(filter) }
      />
  });

  return (
    <div className='filter-tag'>
      {filters}
    </div>
  );
};

export default FilterTags;
