/* eslint-disable react/prop-types */
/**
 *
 * AsyncAutocomplete
 *
 */

import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import { Checkbox, Tooltip, Popper } from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import CustomTextField from '../CustomTextField';

const StyledAutocomplete = withStyles({
  inputRoot: {
    flexWrap: 'nowrap',
  },
})(props => <Autocomplete {...props} />);

const PopperComponent = React.forwardRef((props, ref) => {
  const newProps = {
    ...props,
    style: {
      ...props.style,
      width: 'auto',
      minWidth: props.style ? props.style.width : 200,
    },
  };
  // TT - POPPER - hiển thị PANEL OPTIONS - của AUTOCOMPLETE + DATE TIME PICKER
  return <Popper ref={ref} {...newProps} placement="bottom-start" />;
});
const SELECT_ALL_VALUE = 'SELECT_ALL_VALUE';
function CustomAutocomplete(props) {
  // changeTitleToolTip
  const {
    multiple,
    optionLabel,
    optionValue,
    value,
    onChange,
    options,
    size,
    textLabel,
    required,
    disableClearable,
    isItemDisabled,
    disabledLabel,
    disabled,
    endableSelectAll,
    error,
    ...rest
  } = props;

  const [titleToolTip, setTitleToolTip] = useState(true);

  const [localValue, setLocalValue] = useState([]);

  const [localOptions, setLocalOptions] = useState([]);

  const selectAllEle = useMemo(
    () => ({
      [optionLabel]: 'Tất cả',
      [optionValue]: SELECT_ALL_VALUE,
    }),
    [],
  );

  useEffect(() => {
    let newValue;
    if (multiple && Array.isArray(value) && endableSelectAll) {
      if (localValue.find(l => l[optionValue] === SELECT_ALL_VALUE)) {
        newValue = [selectAllEle, ...value];
      } else {
        newValue = value;
      }
    } else {
      newValue = value;
    }
    setLocalValue(newValue);
  }, [value]);

  useEffect(() => {
    if (Array.isArray(options)) {
      let newOptions = [...options];
      if (endableSelectAll && newOptions.length) {
        newOptions = [selectAllEle, ...newOptions];
      }
      setLocalOptions(newOptions);
    }
  }, [options]);
  // console.log('props', props);
  const CustomOption = (option, { selected }) => (
    <>
      {/* <Checkbox color="primary" checked={selected} style={{ marginRight: 8 }} />
      {option[optionLabel]} */}
      <p
        style={{ width: '100%', marginBottom: '-2px' }}
        disabled={
          typeof isItemDisabled === 'function' && isItemDisabled(option)
        }
      >
        <Checkbox
          color="primary"
          checked={selected}
          style={{ marginRight: 8 }}
          disabled={
            typeof isItemDisabled === 'function' && isItemDisabled(option)
          }
        />
        {option[optionLabel]}
        {typeof isItemDisabled === 'function' &&
          disabledLabel &&
          isItemDisabled(option) && (
            <span
              style={{
                marginTop: '7px',
                float: 'right',
                color: '#f44336',
                fontSize: '0.75rem',
                paddingTop: '2px',
              }}
            >
              * {disabledLabel}
            </span>
          )}
      </p>
    </>
  );

  const CustomOptionCheckDisable = option => (
    <>
      <p
        style={{ width: '100%', marginBottom: '-2px' }}
        disabled={
          typeof isItemDisabled === 'function' && isItemDisabled(option)
        }
      >
        {option[optionLabel]}
        {typeof isItemDisabled === 'function' &&
          disabledLabel &&
          isItemDisabled(option) && (
            <span
              style={{
                float: 'right',
                color: '#f44336',
                fontSize: '0.75rem',
                paddingTop: '2px',
              }}
            >
              * {disabledLabel}
            </span>
          )}
      </p>
    </>
  );
  const InputRender = params => (
    <CustomTextField
      {...params}
      required={required}
      label={textLabel}
      error={required ? value == null || value.length == 0 : null}
      disabled={disabled}
    />
  );

  const TagsRender = tags => (
    <>
      <span
        style={{
          height: 'auto',
          overflow: 'hidden',
          minHeight: '1.1876em',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          paddingLeft: 10,
        }}
      >
        {tags
          .map(c => c[optionLabel])
          .filter(t => t !== 'Tất cả')
          .join(', ')}
      </span>
    </>
  );
  return multiple ? (
    <StyledAutocomplete
      multiple={multiple}
      options={localOptions}
      getOptionDisabled={option =>
        typeof isItemDisabled === 'function' && isItemDisabled(option)
      }
      getOptionLabel={option =>
        // if (typeof isItemDisabled === 'function' && isItemDisabled(option))
        //   return '';
        option[optionLabel]
      }
      size="small"
      value={localValue}
      onChange={(_e, item) => {
        if (Array.isArray(item)) {
          let newItems = [...item];
          let newLocalItems = [...item];

          if (endableSelectAll) {
            if (newItems.find(n => n[optionValue] === SELECT_ALL_VALUE)) {
              if (!localValue.find(n => n[optionValue] === SELECT_ALL_VALUE)) {
                newItems = [...options];
                newLocalItems = [selectAllEle, ...options];
              } else {
                newItems = newItems.filter(n => n[optionLabel] !== 'Tất cả');
                newLocalItems = newLocalItems.filter(
                  n => n[optionLabel] !== 'Tất cả',
                );
              }
            } else if (
              localValue.find(n => n[optionValue] === SELECT_ALL_VALUE)
            ) {
              newItems = [];
              newLocalItems = [];
            }
          }
          newItems = newItems.filter(
            i => !(typeof isItemDisabled === 'function' && isItemDisabled(i)),
          );
          newLocalItems = newLocalItems.filter(
            i => !(typeof isItemDisabled === 'function' && isItemDisabled(i)),
          );

          setLocalValue(newLocalItems);
          onChange(newItems);
        } else {
          setLocalValue(item);
          onChange(item);
        }
      }}
      PopperComponent={PopperComponent}
      openOnFocus
      selectOnFocus
      disableCloseOnSelect
      renderOption={CustomOption}
      renderTags={TagsRender}
      renderInput={InputRender}
      disabled={disabled}
      openText=""
      closeText=""
      popupIcon={
        <Tooltip title={titleToolTip ? 'Mở' : 'Đóng'}>
          <ArrowDropDownIcon />
        </Tooltip>
      }
      onOpen={() => {
        setTitleToolTip(false);
      }}
      onClose={() => {
        setTitleToolTip(true);
      }}
      clearText=""
      closeIcon={
        <Tooltip title="Xóa">
          <CloseIcon />
        </Tooltip>
      }
      {...rest}
    />
  ) : (
    <Autocomplete
      options={options}
      getOptionDisabled={option =>
        typeof isItemDisabled === 'function' && isItemDisabled(option)
      }
      getOptionLabel={option =>
        // console.log('option', option);
        // if (typeof isItemDisabled === 'function' && isItemDisabled(option))
        //   return '';
        option[optionLabel]
      }
      size="small"
      value={value}
      onChange={(_e, item) => {
        if (typeof isItemDisabled === 'function' && isItemDisabled(item))
          return;
        onChange(item);
      }}
      PopperComponent={PopperComponent}
      openOnFocus
      selectOnFocus
      renderOption={CustomOptionCheckDisable}
      renderInput={InputRender}
      disabled={disabled}
      openText=""
      closeText=""
      popupIcon={
        <Tooltip title={titleToolTip ? 'Mở' : 'Đóng'}>
          <ArrowDropDownIcon />
        </Tooltip>
      }
      onOpen={() => {
        setTitleToolTip(false);
      }}
      onClose={() => {
        setTitleToolTip(true);
      }}
      clearText=""
      closeIcon={
        <Tooltip title="Xóa">
          <CloseIcon />
        </Tooltip>
      }
      {...rest}
      disableClearable={disableClearable}
    />
  );
}
CustomAutocomplete.defaultProps = {
  size: 'small',
  optionLabel: 'displayName',
  required: false,
  optionValue: 'code',
  textLabel: 'Mời nhập thông tin',
  multiple: false,
  options: [],
  value: null,
  disabledLabel: '',
  disabled: false,
  endableSelectAll: false,
  error: false,
};

CustomAutocomplete.propTypes = {
  classes: PropTypes.object,
  multiple: PropTypes.bool,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  textLabel: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  isItemDisabled: PropTypes.func,
  disabledLabel: PropTypes.string,
  disableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  endableSelectAll: PropTypes.bool,
  error: PropTypes.bool,
};

export default memo(CustomAutocomplete);
