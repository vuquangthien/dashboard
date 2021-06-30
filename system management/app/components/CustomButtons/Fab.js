import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import { Tooltip, Fab } from '@material-ui/core';

// import iconButtonStyle from 'assets/jss/material-dashboard-pro-react/components/iconButtonStyle';

function CustomFab(props) {
  const {
    // classes,
    children,
    tooltip,
    ...rest
  } = props;
  return tooltip ? (
    <Fab {...rest}>
      <Tooltip title={tooltip}>{children}</Tooltip>
    </Fab>
  ) : (
    <Fab {...rest}>{children}</Fab>
  );
}

CustomFab.defaultProps = {
  size: 'small',
};

CustomFab.propTypes = {
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  disabled: PropTypes.bool,
  children: PropTypes.object,
  tooltip: PropTypes.string,
  size: PropTypes.string,
};

export default CustomFab;
