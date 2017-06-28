import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const BootstrapTextBox = props => {
  const { id, label, value, placeholder, onChange } = props;
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type="text"
                   value={value}
                   placeholder={placeholder}
                   onChange={e => onChange(e.target.value)} />
    </FormGroup>
  );
};

BootstrapTextBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BootstrapTextBox;
