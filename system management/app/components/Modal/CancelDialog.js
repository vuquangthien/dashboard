/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, MenuItem } from '@material-ui/core';
import CustomDialog from './CustomDialog';
import CustomTextField from '../CustomTextField';

export function CancelDialog(props) {
  const { onClose, open, onSave } = props;

  // useEffect(() => {
  //   console.log(1231);
  //   if(props.tabIndex) setTabIndex(props.tabIndex);
  // }, [props.tabIndex])

  return (
    <CustomDialog
      title="Gửi trả nội dung tích hợp"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onSave={onSave}
    >
      <Grid container spacing={2}>
        <Grid item sx={12}>
          <CustomTextField fullWidth select value={1} required>
            <MenuItem value={1}>Nội dung mẫu</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            multiline
            rows={10}
            fullWidth
            required
            label="Nội dung gửi trả"
          />
        </Grid>
      </Grid>
    </CustomDialog>
  );
}

CancelDialog.propTypes = {
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  open: PropTypes.bool,
};

export default CancelDialog;
