/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomLabel(props) {
  const { label, value } = props;
  return (
    <Box display="flex">
      <Box mr={1}>{label}</Box>:
      <Box fontWeight="fontWeightBold" ml={1}>
        {value}
      </Box>
    </Box>
  )
}
export default memo(CustomLabel);

CustomLabel.defaultProps = {
  value: '',
  label: '',
};

CustomLabel.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
}