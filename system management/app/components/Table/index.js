import React, { useState, useRef, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SearchState,
  PagingState,
  IntegratedFiltering,
  IntegratedPaging,
  SelectionState,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
  TableEditRow,
  TableInlineCellEditing,
  TableColumnVisibility,
  ColumnChooser,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';

import { GridExporter } from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';

const apiColumns = [
  { name: 'name', title: 'Name' },
  { name: 'gender', title: 'Gender' },
  { name: 'city', title: 'City' },
  { name: 'car', title: 'Car' },
];

const apiRows = [
  { id: 0, name: 'DevExtreme 1', city: 'DevExpress 1', car: 'test' },
  { id: 1, name: 'DevExtreme 2', city: 'DevExpress 2', car: 'test' },
  { id: 2, name: 'DevExtreme 3', city: 'DevExpress 3', car: 'test' },
  { id: 3, name: 'DevExtreme 4', city: 'DevExpress 4', car: 'test' },
  { id: 4, name: 'DevExtreme 5', city: 'DevExpress 5', car: 'test0' },
  { id: 5, name: 'DevExtreme 1', city: 'DevExpress 1', car: 'test' },
  { id: 6, name: 'DevExtreme 2', city: 'DevExpress 2', car: 'test' },
  { id: 7, name: 'DevExtreme 3', city: 'DevExpress 3', car: 'test' },
  { id: 8, name: 'DevExtreme 4', city: 'DevExpress 4', car: 'test' },
  { id: 9, name: 'DevExtreme 5', city: 'DevExpress 5', car: 'test0' },
  { id: 10, name: 'DevExtreme 1', city: 'DevExpress 1', car: 'test' },
  { id: 11, name: 'DevExtreme 2', city: 'DevExpress 2', car: 'test' },
  { id: 12, name: 'DevExtreme 3', city: 'DevExpress 3', car: 'test' },
  { id: 13, name: 'DevExtreme 4', city: 'DevExpress 4', car: 'test' },
  { id: 14, name: 'DevExtreme 5', city: 'DevExpress 5', car: 'test0' },
  { id: 15, name: 'DevExtreme 1', city: 'DevExpress 1', car: 'test' },
  { id: 16, name: 'DevExtreme 2', city: 'DevExpress 2', car: 'test' },
  { id: 17, name: 'DevExtreme 3', city: 'DevExpress 3', car: 'test' },
  { id: 18, name: 'DevExtreme 4', city: 'DevExpress 4', car: 'test' },
  { id: 19, name: 'DevExtreme 5', city: 'DevExpress 5', car: 'test0' },
];

const getRowId = row => row.id;
const Root = props => <Grid.Root {...props} style={{ height: '100%' }} />;

const onSave = workbook => {
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(
      new Blob([buffer], { type: 'application/octet-stream' }),
      'DataGrid.xlsx',
    );
  });
};

export default () => {
  const [columns] = useState(apiColumns);
  const [rows, setRows] = useState(apiRows);
  const [selection, setSelection] = useState([]);
  const [sorting, setSorting] = useState([{}]);
  const [defaultHiddenColumnNames] = useState([]);

  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const commitChanges = ({ added, changed }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row,
      );
    }
    setRows(changedRows);
  };

  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', top: 15, left: 20 }}>
        Total rows selected: {selection.length}
      </span>
      <Paper style={{ height: '400px' }}>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          rootComponent={Root}
        >
          <SortingState sorting={sorting} onSortingChange={setSorting} />
          <IntegratedSorting />
          <PagingState defaultCurrentPage={0} pageSize={5} />
          <IntegratedPaging />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <IntegratedSelection />
          <SearchState defaultValue="" />
          <IntegratedFiltering />
          <EditingState onCommitChanges={commitChanges} />
          <VirtualTable height="auto" />
          <TableEditRow />
          <TableHeaderRow showSortingControls />
          <TableInlineCellEditing />
          <Toolbar />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <ExportPanel startExport={startExport} />
          <TableSelection showSelectAll />
          <ColumnChooser />
          <SearchPanel />
          <PagingPanel />
        </Grid>
        <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          onSave={onSave}
        />
      </Paper>
    </div>
  );
};
