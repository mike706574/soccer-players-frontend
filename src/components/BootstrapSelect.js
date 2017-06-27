import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const BootstrapSelect = props => {
  const {id, label, value, options, onChange} = props;

  const optionElements = options.map((option, i) => {
    return <option key={i} value={option.value}>{option.description}</option>;
  });

  return (
   <FormGroup controlId={id}>
     <ControlLabel>{label}</ControlLabel>
     <FormControl componentClass="select"
                  value={value}
                  placeholder="Competition"
                  onChange={e => onChange(e.target.value)}>
       <option></option>
       {optionElements}
     </FormControl>
   </FormGroup>
  );
};

BootstrapSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BootstrapSelect;
