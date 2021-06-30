/* eslint-disable react/prop-types */
import React, { useState, memo, useEffect } from 'react';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import {
  Grid as GridTable,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { InputAdornment, Tooltip, Box } from '@material-ui/core';
import { Clear, Search } from '@material-ui/icons';
import IconCustomButton from '../CustomButtons/IconButton';
import CustomTextField from '../CustomTextField';
import * as Validator from '../../utils/validation';

export const RootComponent = props => (
  <GridTable.Root {...props} style={{ maxHeight: 'inherit' }} />
);

export const TableComponent = props => (
  <Table.Table
    {...props}
    style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}
    size="small"
    stickyHeader
  />
);

export const TableComponentFileDetail = props => (
  <Table.Table
    {...props}
    style={{
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      tableLayout: `auto`,
      width: 'max-content',
      minWidth: '100%',
    }}
    size="small"
    stickyHeader
  />
);

export const CellComponent = withStyles({
  cell: {
    position: 'sticky',
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    zIndex: 500,
  },
})(props => {
  const {
    draggingEnabled,
    sortingEnabled,
    classes,
    className,
    ...rest
  } = props;
  const { isDragable } = rest.column;
  return (
    <TableHeaderRow.Cell
      {...rest}
      className={classes.cell}
      align="center"
      draggingEnabled={isDragable == null ? true : isDragable}
    />
  );
});

export const TitleComponent = title => (
  <Tooltip title={title.children}>
    <Box fontWeight="fontWeightBold">{title.children}</Box>
  </Tooltip>
);

export const TextSearchField = memo(props => {
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    if (
      props.textFilter &&
      typeof props.textFilter.searchText === 'string' &&
      props.textFilter.searchText.trim()
    ) {
      setTextSearch(props.textFilter.searchText.trim());
    }
  }, [props.textFilter]);

  const handleReset = () => {
    setTextSearch('');
    props.onTextSearch('');
  };

  const handleSearch = () => {
    if (textSearch.trim().length > 0) {
      const trimTextSearch = textSearch.trim();
      setTextSearch(trimTextSearch);
      props.onTextSearch(trimTextSearch);
    } else {
      setTextSearch('');
      props.onTextSearch('');
    }
  };

  const handleChangeTextSearch = e => {
    let str = e.target.value || '';
    str = str.trimStart();
    setTextSearch(str);
  };
  return (
    <CustomTextField
      error={textSearch && !Validator.validateTextField(textSearch)}
      InputProps={{
        endAdornment: (
          <>
            {textSearch && (
              <InputAdornment position="end">
                <IconCustomButton
                  tooltip="Xóa"
                  size="small"
                  onClick={handleReset}
                >
                  <Clear fontSize="small" />
                </IconCustomButton>
              </InputAdornment>
            )}
            {!(textSearch && !Validator.validateTextField(textSearch)) && (
              <InputAdornment position="end">
                <IconCustomButton
                  tooltip="Tìm kiếm"
                  size="small"
                  onClick={handleSearch}
                >
                  <Search fontSize="small" />
                </IconCustomButton>
              </InputAdornment>
            )}
          </>
        ),
      }}
      value={textSearch}
      onChange={handleChangeTextSearch}
      onKeyPress={e =>
        !(textSearch && !Validator.validateTextField(textSearch)) &&
        e.key === 'Enter' &&
        handleSearch()
      }
      label="Tìm kiếm"
    />
  );
});
