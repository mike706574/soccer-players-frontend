import React from 'react';
import PropTypes from 'prop-types';

const BasicTextBox = ({ value, onChange }) => (
  <span>
    <input type='text'
           value={value}
           onChange={e => onChange(e.target.value)}/>
  </span>
);

BasicTextBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BasicTextBox;
