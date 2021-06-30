/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Paper } from '@material-ui/core';
import CustomDialog from './CustomDialog';
import {
  convertToDateString,
  convertMsToTime,
  getWorkflowIOFields,
} from '../../utils/common';
import { DATE_FORMAT } from '../../utils/constants';
import { taskTypes, taskStatus } from '../../utils/workFlow';
import {
  VIEW_CONFIG,
  buildColumsFromRequestTypeOutputFields,
} from '../../utils/commonConfig';
import GridList from '../GridList';
import CustomLabel from '../CustomLabel';
import { FileDetailsList } from '../GridList/FileDetailsList';
import useStyles from '../../utils/styles';

export function HistoryDialog(props) {
  const {
    request,
    histories: historyRes,
    onClose,
    open,
    fieldNames,
    requestResult,
    isLoading,
    onLoadData,
  } = props;
  const { result = {} } = requestResult;
  const { returnValue = [] } = result;
  const { requestType } = request;
  const { histories, recordCount } = historyRes;
  const memorizedDate = useMemo(() => new Date(), [request]);
  // const [outputFields, setOutputFields] = useState([]);
  const [outputFieldsColumns, setOutputFieldsColumns] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (fieldNames && fieldNames.length && open) {
      getWorkflowIOFields(requestType, request.requestId, fieldNames).then(
        results => {
          // setOutputFields(results.outputFields);
          if (results.outputFields && results.outputFields.length) {
            setOutputFieldsColumns(
              buildColumsFromRequestTypeOutputFields(
                results.outputFields,
                fieldNames,
                // false,
              ),
            );
          }
        },
      );
    }
  }, [requestType, fieldNames, open]);
  // console.log(requestType, outputFields, fieldNames, outputFieldsColumns);

  const mapDataFunction = useCallback((column, value) => {
    if (column.name === 'taskType') {
      const data = taskTypes.find(r => r.code === value);
      return data ? data.displayName : value;
    }
    if (column.name === 'status') {
      const statusDisplayName = taskStatus[value];
      if (statusDisplayName) return statusDisplayName;
    }
    return value;
  }, []);

  return (
    <CustomDialog
      title="Lịch sử xử lý"
      open={open}
      onClose={onClose}
      dialogAction={false}
      maxWidth="lg"
    >
      <Paper className={classes.fullPage}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} justify="space-between">
              <Grid item>
                <CustomLabel
                  label="Bộ ngành"
                  value={request && request.sourceTypeDisplayName}
                />
              </Grid>
              <Grid item>
                <CustomLabel label="Mã hồ sơ" value={request.requestCodeInt} />
              </Grid>
              <Grid item>
                <CustomLabel
                  label="Ngày yêu cầu"
                  value={
                    request &&
                    convertToDateString(
                      request.createdDate,
                      DATE_FORMAT.DATE_TIME,
                    )
                  }
                />
              </Grid>
              <Grid item>
                <CustomLabel label="Số bản ghi trả ra" value={recordCount} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item>
                <CustomLabel
                  label="Thời gian thực hiện"
                  value={
                    request.finishedDate
                      ? convertMsToTime(
                        request.finishedDate - request.createdDate,
                        )
                      : convertMsToTime(memorizedDate * 1 - request.createdDate)
                  }
                  // value={
                  //   request.finishedDate
                  //     ? convertMsToTime(
                  //       request.finishedDate - request.createdDate,
                  //       )
                  //     : convertMsToTime(new Date() * 1 - request.createdDate)
                  // }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/* <Paper> */}
          <GridList
            tableConfig={VIEW_CONFIG.REQUEST_HISTORY}
            // isLoading={isLoading}
            rows={histories}
            count={histories.length}
            mapDataFunction={mapDataFunction}
            // onLoadData={handleLoadData}
            // onChangeSorting={handleSortData}
            showViewConfig={false}
            showPagination={false}
            tableHeight={600}
          />
          {/* </Paper> */}
          {/* <Grid container xs={12}> */}

          <Typography
            component="h5"
            style={{ fontWeight: 'bold', marginTop: '1rem' }}
          >
            Kết quả tích hợp
          </Typography>

          {/* </Grid> */}
          {/* <Paper> */}
          <FileDetailsList
            onLoadData={onLoadData}
            totalData={requestResult}
            data={returnValue}
            columns={outputFieldsColumns}
            isLoading={isLoading}
          />
          {/* </Paper> */}
        </Grid>
      </Paper>
    </CustomDialog>
  );
}

HistoryDialog.defaultProps = {
  histories: [],
  request: {},
  requestResult: [],
};

HistoryDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  histories: PropTypes.array,
  request: PropTypes.object,
  requestResult: PropTypes.array,
  fieldNames: PropTypes.array,
  isLoading: PropTypes.bool,
  onLoadData: PropTypes.func,
};

export default HistoryDialog;
