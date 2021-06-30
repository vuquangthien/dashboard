/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import CustomDialog from './CustomDialog';

export function RemoveDialog(props) {
  const {
    onClose,
    open,
    onSave,
    content = 'Bạn có chắc muốn xóa bản ghi này',
  } = props;

  return (
    <CustomDialog
      title="Xác nhận"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onSave={onSave}
      maxWidth="sm"
      saveText="Đồng ý"
    >
      <Grid container spacing={2}>
        <p>{content}</p>
      </Grid>
    </CustomDialog>
  );
}

RemoveDialog.propTypes = {
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  open: PropTypes.bool,
  content: PropTypes.string,
};

export default RemoveDialog;
