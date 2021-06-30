/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
// import green from '@material-ui/core/colors/green';
// import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

// TT - MÀU CỦA : "SNACKBAR - PHÍA DƯỚI BÊN PHẢI" :
const styles1 = theme => ({
  success: {
    // backgroundColor: green[600],
    backgroundColor: theme.configTheme.bgColorSnackBarWhenSuccess,
  },
  error: {
    // backgroundColor: theme.palette.error.dark,
    backgroundColor: theme.configTheme.bgColorSnackBarWhenError,
  },
  info: {
    // backgroundColor: theme.palette.primary.dark,
    backgroundColor: theme.configTheme.bgColorSnackBarWhenInfo,
  },
  warning: {
    // backgroundColor: amber[700],
    backgroundColor: theme.configTheme.bgColorSnackBarWhenWarning,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing(),
  },
});

const CustomizedSnackbars = props => (
  <Snackbar
    style={{ border: '1px solid #d9d9d9', borderRadius: '4px', zIndex: '10000' }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={props.open}
    onClose={props.onClose}
    autoHideDuration={props.autoHideDuration}
  >
    <MySnackbarContentWrapper
      onClose={props.onClose}
      variant={props.variant ? props.variant : 'success'}
      message={props.message}
    />
  </Snackbar>
);

CustomizedSnackbars.defaultProps = {
  autoHideDuration: 4000,
};
export default withStyles(styles2)(CustomizedSnackbars);
