import React from 'react';
import PropTypes from 'prop-types';

const Error = props => {
  const error = props.error;
  console.log('Error:');
  console.log(error);
  return (
    <div>
      <h1>Error!</h1>
      <pre>An error occurred. It has been logged to the console.</pre>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.object.isRequired
};

export default Error;
