import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

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

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
