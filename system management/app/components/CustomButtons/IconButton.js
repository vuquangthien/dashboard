import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import { IconButton, Tooltip } from '@material-ui/core';

// import iconButtonStyle from 'assets/jss/material-dashboard-pro-react/components/iconButtonStyle';

function IconCustomButton(props) {
  const {
    // classes,
    children,
    tooltip,
    ...rest
  } = props;
  return tooltip ? (
    <IconButton {...rest}>
      <Tooltip title={tooltip}>{children}</Tooltip>
    </IconButton>
  ) : (
    <IconButton {...rest}>{children}</IconButton>
  );
}

IconCustomButton.propTypes = {
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.object,
  noBg: PropTypes.bool,
  tooltip: PropTypes.string,
};

export default IconCustomButton;
