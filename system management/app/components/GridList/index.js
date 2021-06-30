/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/**
 *
 * GridList
 *
 */

import React, {
  Fragment,
  useState,
  useEffect,
  memo,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  IntegratedSelection,
  SelectionState,
  SortingState,
  DataTypeProvider,
  PagingState,
  CustomPaging,
  TreeDataState,
  CustomTreeData,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid as GridTable,
  Table,
  TableHeaderRow,
  TableSelection,
  TableColumnReordering,
  PagingPanel,
  TableFixedColumns,
  TableTreeColumn,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { Add, Delete, Edit, Settings } from '@material-ui/icons';
import { Grid, Button, Tooltip, Box } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Loading from '../Loading';
import ViewConfigDialog from '../Modal/ViewConfigDialog';
import {
  convertToDateString,
  convertFileSize,
  convertMsToTime,
  checkHasPermission,
} from '../../utils/common';
import { FORMAT_TYPE, DATE_FORMAT } from '../../utils/constants';
import {
  makeSelectViewConfig,
  makeSelectCurrentUser,
} from '../../containers/AdminPage/selectors';

import {
  createViewConfig,
  updateViewConfig,
} from '../../containers/AdminPage/actions';
import RemoveDialog from '../Modal/RemoveDialog';
import CustomFab from '../CustomButtons/Fab';
import {
  CellComponent,
  TableComponent,
  RootComponent,
  TitleComponent,
  TextSearchField,
  TableComponentFileDetail,
} from './CustomComponent';
// import useStyles from '../../utils/styles';

function getChildRows(row, rootRows) {
  const childRows = rootRows.filter(e => e.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
}

function GridList(props) {
  const {
    isLoading,
    rows,
    count,
    customActions,
    extendFilter,
    viewConfig,
    // tableConfig,
    mapDataFunction,
    onChangeSorting,
    onLoadData,
    onCreateViewConfig,
    onUpdateViewConfig,
    onAddItem,
    onEditItem,
    onDeleteItem,
    onOpenLink,
    onSelectItem,
    onTextSearch,
    tree,
    showCheckBox,
    showPagination,
    showViewConfig,
    extendActions,
    rowDetail,
    paging,
    tableHeight,
    isFileDetailTable,
    disableAddItem,
    currentUser,
    viewConfigPermission,
    openLinkPermission,
    textSearchPermission,
    addItemPermission,
    deleteItemPermission,
    editItemPermission,
    client,
  } = props;

  // const classes = useStyles();

  const tableRef = useRef(null);
  // const [tableRef, setTableRef] = useState({});

  const [columns, setColumns] = useState([]);

  const [viewableColumns, setViewableColumns] = useState([]);

  const [sortableColumns, setSortableColumns] = useState([]);

  const [rightColumns, setRightColumns] = useState([]);

  const [columnNames, setColumnNames] = useState([]);

  const [columnWidths, setColumnWidths] = useState([]);

  const [columnOrder, setColumnOrder] = useState([]);

  const [openViewConfigDialog, setOpenViewConfigDialog] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState([]);

  const [page, setPage] = useState(paging.skip / paging.limit);

  const [rowsPerPage, setRowsPerPage] = useState(paging.limit);

  const [displayRows, setDisplayRows] = useState([]);

  useEffect(() => {
    let newDisplayRows;
    if (client) {
      newDisplayRows = [...rows].splice(paging.skip, rowsPerPage);
    } else {
      newDisplayRows = [...rows];
    }
    setDisplayRows(newDisplayRows);
  }, [rows, rowsPerPage]);
  useEffect(() => {
    const { skip, limit } = paging;
    // if (paging && paging.skip === 0) {
    if (skip && limit) {
      setPage(paging.skip / paging.limit);
    } else {
      setPage(0);
    }
    setRowsPerPage(limit);
    // }
  }, [paging]);

  useEffect(() => {
    // let tableColumns = null;
    if (showViewConfig && viewConfig && viewConfig.length > 0) {
      // const currentConfig = getCurrentConfig();
      // tableColumns = currentConfig
      //   ? JSON.parse(currentConfig.value)
      //   : tableConfig.DEFAULT_COLUMNS;
    } else {
      // tableColumns = tableConfig.DEFAULT_COLUMNS;
    }

    // tableColumns = tableConfig.DEFAULT_COLUMNS;

    // setColumns(tableColumns);

    // setRightColumns(tableColumns.filter(c => c.isRightColumn).map(r => r.name));

    // const newColumnNames = tableColumns.map(r => r.name);

    // setColumnNames(newColumnNames);

    // setColumnWidths(
    //   tableColumns
    //     .filter(c => c.width !== '' && c.width != null)
    //     .map(c => ({
    //       columnName: c.name,
    //       width: c.width,
    //     })),
    // );

    // setSortableColumns(
    //   tableColumns.map(c => ({
    //     columnName: c.name,
    //     sortingEnabled: c.isSortable ? true : c.isSortable,
    //   })),
    // );
  }, [viewConfig]);

  useEffect(() => {
    setViewableColumns(columns.filter(c => c.checked));
    setColumnOrder(columns.sort((a, b) => a.order - b.order).map(c => c.name));
  }, [columns]);

  // useEffect(() => {
  //   if (tableRef.current && navigator.platform.indexOf('Win') > -1) {
  //     // eslint-disable-next-line
  //     ps = new PerfectScrollbar(tableRef.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: true,
  //     });
  //   }
  // }, [tableRef.current]);
  const handleLoadData = (newRowsPerPage, newSkip, newPage) => {
    if (client) {
      const newDisplayRows = [...rows].splice(newSkip, newRowsPerPage);
      setDisplayRows(newDisplayRows);
    } else {
      onLoadData(newRowsPerPage, newSkip, newPage);
    }
  };

  // const getCurrentConfig = () =>
  //   viewConfig.find(v => v.parameter === tableConfig.PARAMETER);

  const handleOpenViewConfigDialog = useCallback(() => {
    setOpenViewConfigDialog(true);
  }, []);

  const handleCloseViewConfigDialog = useCallback(() => {
    setOpenViewConfigDialog(false);
  }, []);

  const handleChangePage = newPage => {
    setPage(newPage);
    const skip = newPage * rowsPerPage;
    handleLoadData(rowsPerPage, skip, newPage + 1);
    if (tableRef && tableRef.current) {
      const elm = tableRef.current;
      elm.firstElementChild.firstElementChild.scrollTop = 0;
    }
  };

  const handleChangeRowsPerPage = pageSize => {
    setRowsPerPage(pageSize);
    setPage(0);
    handleLoadData(pageSize, 0, 1);
  };

  const handleChangeSorting = sortedColumns => {
    onChangeSorting && onChangeSorting(sortedColumns);
  };

  const changeColumnOrder = newOrder => {
    const newColumns = columns.map(item => ({
      ...item,
      order: newOrder.indexOf(item.name),
    }));
    setColumnOrder(newOrder);
    showViewConfig && saveConfig(newColumns);
  };

  const saveConfig = newColumns => {
    // const data = {
    //   parameter: tableConfig.PARAMETER,
    //   value: JSON.stringify(newColumns),
    // };
    // const currentConfig = getCurrentConfig();
    // if (currentConfig) {
    //   data.id = currentConfig.id;
    //   onUpdateViewConfig(data);
    // } else {
    //   onCreateViewConfig(data);
    // }
  };

  const handleSelectionChange = selection => {
    const selected = [];
    selection.forEach(index => {
      selected.push(displayRows[index]);
    });

    setSelectedItem(selected);
    onSelectItem && onSelectItem(selected);
  };

  const handleCloseConfirmDialog = useCallback(() => {
    setOpenConfirmDialog(false);
    setSelectedItem([]);
  }, []);

  const handleSaveViewConfig = useCallback(
    newColumns => {
      setOpenViewConfigDialog(false);
      showViewConfig && saveConfig(newColumns);
    },
    [viewConfig],
  );

  const handleDeleteAllItem = () => {
    if (selectedItem.length > 0) {
      setOpenConfirmDialog(true);
    }
  };

  const handleDeleteItem = item => {
    setSelectedItem([item]);
    setOpenConfirmDialog(true);
  };

  const handleDelete = useCallback(() => {
    onDeleteItem(selectedItem);
    setSelectedItem([]);
    setOpenConfirmDialog(false);
  }, [selectedItem]);

  const CustomTypeProvider = params => (
    <DataTypeProvider formatterComponent={CustomTypeFormatter} {...params} />
  );

  const CustomTypeFormatter = item => {
    const { column } = item;
    const value = mapDataFunction
      ? mapDataFunction(column, item.value, item.row)
      : item.value;
    if (!column.formatType || !value) return <Fragment>{value}</Fragment>;

    switch (column.formatType) {
      case FORMAT_TYPE.DATE:
        return (
          <Box textAlign="center">{value && convertToDateString(value)}</Box>
        );
      case FORMAT_TYPE.BIRTH_DATE:
        return <Box textAlign="center">{value}</Box>;
      case FORMAT_TYPE.DATE_TIME:
        return (
          <Box textAlign="center">
            {value && convertToDateString(value, DATE_FORMAT.DATE_TIME)}
          </Box>
        );
      case FORMAT_TYPE.TIME:
        return (
          <Box textAlign="center">
            {value && convertToDateString(value, DATE_FORMAT.TIME)}
          </Box>
        );
      case FORMAT_TYPE.FORMATTED_MS:
        return <Box textAlign="center">{value && convertMsToTime(value)}</Box>;
      case FORMAT_TYPE.MONTH:
        return (
          <Box textAlign="center">
            {value && convertToDateString(value, DATE_FORMAT.MONTH)}
          </Box>
        );
      case FORMAT_TYPE.NUMBER:
        if (column.name === 'order') {
          return (
            <Box style={{ marginLeft: '-8px' }} textAlign="center">
              {value}
            </Box>
          );
        }
        return <Box textAlign="center">{value}</Box>;
      case FORMAT_TYPE.LINK:
        if (
          // currentUser &&
          // currentUser.actions &&
          // currentUser.actions.find(e => `${e}` === `${openLinkPermission}`)
          checkHasPermission(currentUser, openLinkPermission)
        ) {
          return (
            <Button
              style={{ paddingLeft: 0 }}
              color="primary"
              onClick={() => onOpenLink(item.row)}
            >
              {value}
            </Button>
          );
        }
        return (
          <Button
            style={{ paddingLeft: 0 }}
            // color="primary"
            // onClick={() => onOpenLink(item.row)}
          >
            {value}
          </Button>
        );

      case FORMAT_TYPE.LINK_CENTER:
        if (
          // currentUser &&
          // currentUser.actions &&
          // currentUser.actions.find(e => `${e}` === `${openLinkPermission}`)
          checkHasPermission(currentUser, openLinkPermission)
        ) {
          return (
            <Box textAlign="center">
              <Button
                style={{ paddingLeft: 0 }}
                color="primary"
                onClick={() => onOpenLink(item.row)}
              >
                {value}
              </Button>
            </Box>
          );
        }
        return (
          <Box textAlign="center">
            <Button
              style={{ paddingLeft: 0 }}
              // color="primary"
              // onClick={() => onOpenLink(item.row)}
            >
              {value}
            </Button>
          </Box>
        );
      case FORMAT_TYPE.DATE_TIME_LINK:
        if (value && convertToDateString(value, DATE_FORMAT.DATE_TIME)) {
          if (
            // currentUser &&
            // currentUser.actions &&
            // currentUser.actions.find(e => `${e}` === `${openLinkPermission}`)
            checkHasPermission(currentUser, openLinkPermission)
          ) {
            return (
              <Button
                style={{ paddingLeft: 0 }}
                color="primary"
                onClick={() => onOpenLink(item.row)}
              >
                {value && convertToDateString(value, DATE_FORMAT.DATE_TIME)}
              </Button>
            );
          }
          return (
            <Button
              style={{ paddingLeft: 0 }}
              // color="primary"
              // onClick={() => onOpenLink(item.row)}
            >
              {value && convertToDateString(value, DATE_FORMAT.DATE_TIME)}
            </Button>
          );
        }
        return <Fragment>{value}</Fragment>;

      case FORMAT_TYPE.TOOLTIP:
        return (
          <Tooltip title={value}>
            <Box>{value}</Box>
          </Tooltip>
        );
      case FORMAT_TYPE.FILE_SIZE:
        return <Fragment>{value && convertFileSize(value)}</Fragment>;
      default:
        return value;
    }
  };

  const ActionTypeProvider = params => (
    <DataTypeProvider formatterComponent={ActionTypeFormatter} {...params} />
  );

  const ActionTypeFormatter = item => (
    <Grid container justify="center" alignItems="center" spacing={2}>
      {!customActions ? (
        <>
          {onEditItem && checkHasPermission(currentUser, editItemPermission) && (
            <Grid item>
              <CustomFab
                color="primary"
                size="small"
                tooltip="Cập nhật"
                onClick={() => onEditItem(item.row)}
                // className={classes.fabControl}
              >
                <Edit />
              </CustomFab>
            </Grid>
          )}
          {onDeleteItem &&
            checkHasPermission(currentUser, deleteItemPermission) && (
              <Grid item>
                <CustomFab
                  color="secondary"
                  tooltip="Xóa"
                  size="small"
                  onClick={() => handleDeleteItem(item.row)}
                  // className={classes.fabControl}
                >
                  <Delete />
                </CustomFab>
              </Grid>
            )}
        </>
      ) : (
        customActions(item.row)
      )}
    </Grid>
  );

  return (
    <div style={props.style}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xl={6} xs={6}>
          <Grid container spacing={2}>
            <Grid item xs>
              {onTextSearch &&
                // currentUser &&
                // currentUser.actions &&
                // currentUser.actions.find(
                //   e => `${e}` === `${textSearchPermission}`,)
                checkHasPermission(currentUser, textSearchPermission) && (
                  <TextSearchField
                    onTextSearch={onTextSearch}
                    textFilter={props.textFilter}
                  />
                )}
            </Grid>
            <Grid item xs>
              {extendFilter}
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Grid container justify="flex-end" spacing={2}>
            {onAddItem &&
              // currentUser &&
              // currentUser.actions &&
              // currentUser.actions.find(
              //   e => `${e}` === `${addItemPermission}`,
              // )
              checkHasPermission(currentUser, addItemPermission) && (
                <Grid item>
                  <CustomFab
                    color="primary"
                    size="small"
                    tooltip="Thêm mới"
                    onClick={onAddItem}
                    disabled={disableAddItem}
                    // className={classes.fabControl}
                  >
                    <Add fontSize="small" />
                  </CustomFab>
                </Grid>
              )}
            {onDeleteItem &&
              selectedItem.length > 1 &&
              // currentUser.actions &&
              // currentUser.actions.find(
              //   e => `${e}` === `${deleteItemPermission}`,
              // )
              checkHasPermission(currentUser, deleteItemPermission) && (
                <Grid item>
                  <CustomFab
                    color="secondary"
                    tooltip="Xóa chọn"
                    size="small"
                    onClick={handleDeleteAllItem}
                    // className={classes.fabControl}
                  >
                    <Delete fontSize="small" />
                  </CustomFab>
                </Grid>
              )}
            {showViewConfig &&
              // currentUser &&
              // currentUser.actions &&
              // currentUser.actions.find(
              //   e => `${e}` === `${viewConfigPermission}`,
              // )
              checkHasPermission(currentUser, viewConfigPermission) && (
                <Grid item>
                  <CustomFab
                    color="primary"
                    size="small"
                    tooltip="Cấu hình"
                    onClick={handleOpenViewConfigDialog}
                    // className={classes.fabControl}
                  >
                    <Settings fontSize="small" />
                  </CustomFab>
                </Grid>
              )}
            <Grid item>{extendActions}</Grid>
          </Grid>
        </Grid>
      </Grid>

      <div
        ref={tableRef}
        style={{
          maxHeight: `calc(100vh - ${tableHeight}px)`,
          marginTop: 10,
        }}
      >
        {viewableColumns.length && (
          // {!isLoading && viewableColumns.length && (
          <GridTable
            rows={displayRows}
            columns={viewableColumns}
            align="center"
            rootComponent={RootComponent}
          >
            {tree && <TreeDataState />}
            {tree && <CustomTreeData getChildRows={getChildRows} />}

            <SortingState
              onSortingChange={handleChangeSorting}
              columnExtensions={sortableColumns}
            />

            {(showCheckBox || tree) && (
              <SelectionState onSelectionChange={handleSelectionChange} />
            )}
            {rowDetail && <RowDetailState />}

            {showCheckBox && <IntegratedSelection />}
            <DragDropProvider />
            <CustomTypeProvider for={columnNames} />
            <ActionTypeProvider for={['actions']} />
            {showPagination && (
              <PagingState
                currentPage={page}
                onCurrentPageChange={handleChangePage}
                pageSize={rowsPerPage}
                onPageSizeChange={handleChangeRowsPerPage}
              />
            )}

            {showPagination && <CustomPaging totalCount={count || 0} />}

            <Table
              tableComponent={
                isFileDetailTable ? TableComponentFileDetail : TableComponent
              }
              messages={{
                noData: 'Không có dữ liệu',
              }}
              columnExtensions={columnWidths}
            />
            {showCheckBox && (
              <TableSelection showSelectAll={false} showSelectionColumn />
            )}
            {showPagination && (
              <PagingPanel
                pageSizes={[25, 50, 100]}
                messages={{
                  rowsPerPage: 'Kết quả mỗi trang',
                  info: info =>
                    `${info.from} đến ${info.to} trên tổng ${info.count}`,
                }}
              />
            )}

            <TableColumnReordering
              order={columnOrder}
              onOrderChange={changeColumnOrder}
            />
            <TableHeaderRow
              showSortingControls
              cellComponent={CellComponent}
              messages={{ sortingHint: '' }}
              titleComponent={TitleComponent}
            />
            {rowDetail && <TableRowDetail contentComponent={rowDetail} />}

            {tree && (
              <TableTreeColumn for="displayName" showSelectionControls />
            )}

            {rightColumns.length > 0 && (
              <TableFixedColumns rightColumns={rightColumns} />
            )}
          </GridTable>
        )}
        {/* TT : RENDER DIV VITUAL TABLE - WHEN LOADING + ERROR COLUMN CONFIG */}
        {/* {
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            {isLoading && <TableVirtualLoading zIndexNumber={800} />}
            {viewableColumns.length === 0 && (
              <TableVirtualLoading zIndexNumber={600} />
            )}
          </div>
        } */}
      </div>
      {isLoading && <Loading />}
      <ViewConfigDialog
        open={openViewConfigDialog}
        columns={columns}
        // defaultColumns={tableConfig.DEFAULT_COLUMNS}
        onClose={handleCloseViewConfigDialog}
        saveSetting={handleSaveViewConfig}
      />
      <RemoveDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onSave={handleDelete}
      />
    </div>
  );
}

GridList.defaultProps = {
  showPagination: true,
  showCheckBox: false,
  showViewConfig: true,
  count: 0,
  rows: [],
  paging: { limit: 25, skip: 0, page: 0 },
  isFileDetailTable: false,
  disableAddItem: false,
};

GridList.propTypes = {
  isLoading: PropTypes.bool,
  // viewConfig: PropTypes.array,
  // tableConfig: PropTypes.object,
  rows: PropTypes.array,
  count: PropTypes.number,
  customActions: PropTypes.func,
  onChangeSorting: PropTypes.func,
  onLoadData: PropTypes.func,
  onAddItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onOpenLink: PropTypes.func,
  onTextSearch: PropTypes.func,
  // onInputChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  showCheckBox: PropTypes.bool,
  showPagination: PropTypes.bool,
  showViewConfig: PropTypes.bool,
  mapDataFunction: PropTypes.func,
  paging: PropTypes.object,
  rowDetail: PropTypes.func,
  isFileDetailTable: PropTypes.bool,
  extendActions: PropTypes.object,
  extendFilter: PropTypes.node || PropTypes.object,
  disableAddItem: PropTypes.bool,
  viewConfigPermission: PropTypes.string,
  openLinkPermission: PropTypes.string,
  client: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  viewConfig: makeSelectViewConfig(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCreateViewConfig: data => dispatch(createViewConfig(data)),
    onUpdateViewConfig: data => dispatch(updateViewConfig(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(GridList);
