import React from 'react';
import PropTypes from 'prop-types';

const BasicTextBox = ({ id, label, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id}
           type='text'
           onChange={e => onChange(e.target.value)} />
  </div>
);

BasicTextBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BasicTextBox;
