/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import CustomDialog from './CustomDialog';

// TT
export function NotHasPermissionDialog(props) {
  const { onClose, open } = props;

  return (
    <CustomDialog
      title="Thông Báo"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      maxWidth="sm"
      cancelText="Đóng"
    >
      <Grid container spacing={2}>
        <p>Bạn không có quyền truy cập chức năng này.</p>
      </Grid>
    </CustomDialog>
  );
}

NotHasPermissionDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default NotHasPermissionDialog;
