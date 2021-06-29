import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridSlotComponentProps,
} from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import { useDemoData } from '@material-ui/x-grid-data-generator';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CustomToolbarGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 10,
  });

  // const rows = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  //   { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  // ];

  // const columns = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        {...data}
        checkboxSelection
        pagination
        pageSize={10}
        // rows={rows}
        // columns={columns}
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
}
