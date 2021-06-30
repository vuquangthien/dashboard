import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { Close, Save, Cancel } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(3),
    color: theme.palette.grey[500],
  },
  paperWidthLg: {
    height: '852px',
  },
  paperWidthMd: {
    height: '640px',
  },
  paperWidthSm: {
    height: '296px',
  },
}));

const useStylesSm = makeStyles(theme => ({
  paperWidthSm: {
    height: '400px',
  },
}));

const useStylesMd = makeStyles(theme => ({
  paperWidthMd: {
    height: '640px',
  },
}));

const useStylesLg = makeStyles(theme => ({
  paperWidthLg: {
    height: '852px',
  },
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function CustomDialog(props) {
  const {
    title,
    children,
    onClose,
    open,
    onSave,
    canSave,
    onCancel,
    saveText,
    cancelText,
    maxWidth,
    dialogAction,
    extraAction,
    disabledFlex,
  } = props;

  const classes = useStyles();
  const smClasses = useStylesSm();
  const mdClasses = useStylesMd();
  const lgClasses = useStylesLg();
  let dialogClasses = null;
  if (maxWidth === 'sm') {
    dialogClasses = smClasses;
  } else if (maxWidth === 'md') {
    dialogClasses = mdClasses;
  } else if (maxWidth === 'lg') {
    dialogClasses = lgClasses;
  }
  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}
      classes={dialogClasses}
    >
      {title && (
        <DialogTitle id="alert-dialog-title" className={classes.root}>
          {title}
          {onClose && (
            <Tooltip title="Đóng">
              <IconButton
                size="small"
                aria-label="close"
                onClick={onClose}
                className={classes.closeButton}
              >
                <Close />
              </IconButton>
            </Tooltip>
          )}
        </DialogTitle>
      )}

      <DialogContent
        dividers
        className="dialog-content"
        style={
          !disabledFlex ? { display: 'flex', flexDirection: 'column' } : {}
        }
      >
        {children}
      </DialogContent>
      {dialogAction && (
        <DialogActions>
          {onSave && (
            <Button
              startIcon={<Save />}
              size="small"
              onClick={onSave}
              disabled={!canSave}
              color="primary"
              variant="contained"
            >
              {saveText}
            </Button>
          )}
          <Button
            startIcon={<Cancel />}
            size="small"
            onClick={onCancel || onClose}
            color="secondary"
            variant="contained"
          >
            {cancelText}
          </Button>
          {extraAction}
        </DialogActions>
      )}
    </Dialog>
  );
}

CustomDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  saveText: PropTypes.string,
  cancelText: PropTypes.string,
  maxWidth: PropTypes.string,
  dialogAction: PropTypes.bool,
  canSave: PropTypes.bool,
  extraAction: PropTypes.object,
  disabledFlex: PropTypes.bool,
};

CustomDialog.defaultProps = {
  maxWidth: 'md',
  saveText: 'Lưu lại',
  cancelText: 'Hủy',
  dialogAction: true,
  canSave: true,
};

export default CustomDialog;
