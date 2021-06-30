import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Grid } from '@material-ui/core';
import CustomDialog from './CustomDialog';
import CustomTextField from '../CustomTextField';
export function ViewConfigDialog(props) {
  const { onClose, open, defaultColumns } = props;

  const [columns, setColumns] = useState([]);

  // const titleRules = {
  //   isRequired: true,
  //   minLength: 1,
  //   maxLength: 50,
  // };
  useEffect(() => {
    if (props.columns) {
      setColumns(props.columns);
    }
  }, [props.columns]);

  useEffect(() => {
    if (!open) {
      setColumns(props.columns);
    }
  }, [open]);

  const handleSave = () => {
    // if (checkValidate()) {
    //   const newColumns = columns.map(c => ({
    //     ...c,
    //     title: c.title.trim(),
    //   }));
    //   saveSetting(newColumns);
    // }
  };

  const handleChecked = e => {
    const { name, checked } = e.target;
    if (!checked && columns.filter(c => c.checked).length < 2) {
      return;
    }
    const newColumns = columns.map(item =>
      item.name === name ? { ...item, checked } : item,
    );
    setColumns(newColumns);
  };

  const handleChange = (e, field) => {
    // const curentColumns = { name: e.target.name, title: e.target.value };
    // eslint-disable-next-line prefer-const
    let { name, value } = e.target;
    if (field === 'width') {
      value = value !== '' ? parseInt(value, 0) : '';
    }
    const newColumns = columns.map(item =>
      item.name === name ? { ...item, [field]: value } : item,
    );
    setColumns(newColumns);
  };

  // const checkValidate = () =>
  //   columns.find(
  //     c =>
  //       !checkWidthValidate(c.width) ||
  //       !Validators.validateTextField(c.title, titleRules),
  //   ) == null;

  // const checkWidthValidate = width => {
  //   if (width !== 0 && !width) return true;
  //   // console.log('width < 400', width < 400)
  //   return width >= 50 && width < 400;
  // };

  const parseLable = name => {
    const label = defaultColumns && defaultColumns.find(d => d.name === name);
    return label ? label.title : '';
  };
  // const widthRules = {
  //   isRequired: false,
  //   minLength: 50,
  //   maxLength: 400,
  //   isNumber: true,
  // };
  return (
    <CustomDialog
      title="Cấu hình lưới dữ liệu hiển thị"
      open={open}
      onSave={handleSave}
      onClose={onClose}
    >
      {columns.map(item => (
        <Grid container spacing={3} key={item.name}>
          <Grid item xs>
            <CustomTextField
              value={item.title}
              name={item.name}
              onChange={e => handleChange(e, 'title')}
              label={parseLable(item.name)}
              // errorText="Bắt buộc"
              // required
            />
          </Grid>
          <Grid item>
            <CustomTextField
              value={item.width ? item.width.toString() : ''}
              type="number"
              name={item.name}
              onChange={e => handleChange(e, 'width')}
              label="Chiều rộng"
              // error={
              //   typeof Validators.validateTextFieldReturnError(
              //     item.width,
              //     widthRules,
              //   ) === 'string'
              // }
              // helperText={Validators.validateTextFieldReturnError(
              //   item.width,
              //   widthRules,
              // )}
            />
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              inputProps={{
                name: [item.name],
              }}
              onChange={handleChecked}
              checked={item.checked}
              color="primary"
            />
          </Grid>
        </Grid>
      ))}
    </CustomDialog>
  );
}

ViewConfigDialog.propTypes = {
  columns: PropTypes.array,
  defaultColumns: PropTypes.array,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default ViewConfigDialog;
