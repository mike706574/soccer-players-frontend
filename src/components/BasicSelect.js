import React from 'react';
import PropTypes from 'prop-types';

const BasicSelect = props => {
  const {value, options, onChange} = props;

  const optionElements = options.map((option, i) => {
    return <option key={i} value={option.value}>{option.description}</option>;
  });

  return (
    <select value={value}
       onChange={e => onChange(e.target.value)}>
      <option></option>
      {optionElements}
    </select>
  );
};

BasicSelect.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BasicSelect;
