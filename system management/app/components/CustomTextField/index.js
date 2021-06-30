/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  input: {
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
}));

function CustomTextField(props) {
  const { endIcon, startIcon, required, value, onChange, readOnly, helperText, defaultValue, maxLength, type, multiline,error, ...rest } = props;
  const classes = useStyles();
  const trimStartValue = e => {
    if (onChange) {
      // phoneNumber
      if (e && e.target && typeof e.target.value === 'string') {
        if (e.target.value.trimStart) {
          e.target.value = e.target.value.trimStart();
        }
        e.target.value = e.target.value.replace(/\s(?=\s)/g, '');
        if (type === 'phoneNumber') {
          if (e.target.value[0] !== '0') {
            e.target.value = '';
          };
          e.target.value = e.target.value.replace(/\D/g, '');
          if (maxLength && e && e.target && e.target.value) {
            const len = parseInt(maxLength, 10);
            if (len && e.target.value.length > len) return;
          }
        } else if (type === 'number') {
          e.target.value = e.target.value.replace(/\D/g, '');
        } else if (type === 'name') {
          e.target.value = e.target.value.replace(/[^'A-Za-zsÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]|\s(?=\s)/g, '');
        } else if (type === 'snake_Case') {
          e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
        } else if (type === 'TextCapital') {
          e.target.value = e.target.value.toLowerCase();
          e.target.value = e.target.value.replace(/(?:^|\s)\S/g, letter => letter.toUpperCase());
        }
        if (e.target.value) {
          const len = parseInt(maxLength, 10);
          if (len && e.target.value.length > len) return;
        }

      }
      onChange(e);
    }
  }
  const inputClasses = readOnly ? classes.input : null;
  useEffect(() => {
    const formArrRemoveHoverText = document.getElementsByClassName('formBrowserNoValidateToRemoveTextHover');
    for (let i = 0; i < formArrRemoveHoverText.length; i++) {
      formArrRemoveHoverText[i].addEventListener('submit', function () {
        event.preventDefault();
      });
    };
  }, []);
  // TT : remove validate message - of browser
  return <form className='formBrowserNoValidateToRemoveTextHover' noValidate>
    <TextField
      helperText={helperText}
      required={required}
      multiline={multiline}
      InputProps={{
        className: inputClasses,
        endAdornment: endIcon && (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        ),
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ),
      }}
      error={error}
      disabled={readOnly}
      value={value}
      onChange={trimStartValue}
      defaultValue={defaultValue}
      // type={type}
      {...rest}
    />
  </form>;
}
export default memo(CustomTextField);

CustomTextField.defaultProps = {
  variant: 'outlined',
  margin: 'dense',
  size: 'small',
  fullWidth: true,
  value: '',
  readOnly: false,
  required: false,
  multiline: false,
  error: false,
};

CustomTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  margin: PropTypes.string,
  variant: PropTypes.string,
  startIcon: PropTypes.object,
  endIcon: PropTypes.object,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  readOnly: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  error: PropTypes.bool,
}