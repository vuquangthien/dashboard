import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Dialog,
  Toolbar,
  Typography,
  DialogContent,
  AppBar,
  Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/lib/connect/connect';
import { makeSelectMiniActive } from '../../containers/AdminPage/selectors';
import IconCustomButton from '../CustomButtons/IconButton';
import Footer from '../Layout/Footer';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(3),
    color: theme.palette.grey[500],
  },
  paperFullScreen: miniActive => ({
    marginLeft: miniActive ? 80 : 260,
    backgroundColor: '#F4F6F8',
  }),
  appBar: {
    position: 'relative',
  },
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

export function FullscreenDialog(props) {
  const { title, extendIcons, children, onClose, open, miniActive } = props;
  const classes = useStyles(miniActive);

  return (
    <div
      style={{
        width: 500,
        backgroundColor: '#F4F6F8',
      }}
    >
      <Dialog
        classes={{ paperFullScreen: classes.paperFullScreen }}
        fullScreen
        open={open}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconCustomButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="Close"
              tooltip="Đóng"
            >
              <Close fontSize="small" />
            </IconCustomButton>
            <Typography style={{ flexGrow: 1 }}>{title}</Typography>
            {extendIcons && extendIcons()}
          </Toolbar>
        </AppBar>

        <DialogContent style={{ padding: '8px 16px 0px' }}>
          {children}
        </DialogContent>
        <Footer fluid />
      </Dialog>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  miniActive: makeSelectMiniActive(),
});

FullscreenDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
  extendIcons: PropTypes.func,
  miniActive: PropTypes.bool,
};

export default connect(mapStateToProps)(FullscreenDialog);
