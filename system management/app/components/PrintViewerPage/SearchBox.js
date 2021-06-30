/* eslint-disable react/prop-types */
/**
 *
 * ReportPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Tooltip } from '@material-ui/core';

import { Search, Print, FileCopy } from '@material-ui/icons';
import CustomAutocomplete from '../CustomAutocomplete';
import { REPORT_TYPE, FILE_TYPE } from '../../utils/constants';
import { taskTypes, workflowStatus } from '../../utils/workFlow';
import { frequencies } from '../../utils/commonConfig';
import CustomDateRangePicker from '../DateRangePicker';

export function SearchBox(props) {
  const {
    onGetReports,
    onExportFile,
    onPrintPDF,
    reportType,
    sourceTypes,
    receivers,
    approvers,
    query,
    setQuery,
  } = props;

  useEffect(() => {
    setQuery({
      sourceType: null,
      taskType: null,
      workFlowStatus: null,
      requestType: null,
      assigneeName: null,
      frequency: null,
      fromDate: null,
      toDate: null,
    });
  }, [reportType]);

  const handleChange = (name, data) => {
    setQuery({
      ...query,
      [name]: data,
    });
  };

  const handleDatesChange = dates => {
    const [fromDate, toDate] = dates;
    setQuery({
      ...query,
      fromDate,
      toDate,
    });
  };

  const canSeach =
    query.frequency != null && query.fromDate != null && query.toDate != null;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3} xs={6}>
          {(reportType === REPORT_TYPE.SOURCE_TYPE ||
            reportType === REPORT_TYPE.PROCESS_TIME_BY_SOURCE_TYPE) && (
            <CustomAutocomplete
              optionLabel="ministryName"
              value={query.sourceType}
              textLabel="Đối tượng yêu cầu"
              name="sourceType"
              onChange={value => handleChange('sourceType', value)}
              options={sourceTypes || []}
            />
          )}
          {reportType === REPORT_TYPE.TASK_STATUS && (
            <CustomAutocomplete
              value={query.workFlowStatus}
              textLabel="Trạng thái thực hiện"
              name="workFlowStatus"
              onChange={value => handleChange('workFlowStatus', value)}
              options={workflowStatus}
            />
          )}
          {(reportType === REPORT_TYPE.RECEIVE_EMPLOYEE ||
            reportType === REPORT_TYPE.PROCESS_TIME_BY_RECEIVE_EMPLOYEE) && (
            <CustomAutocomplete
              value={query.assigneeName}
              textLabel="Cán bộ tiếp nhận"
              name="assigneeName"
              onChange={value => handleChange('assigneeName', value)}
              options={receivers || []}
            />
          )}
          {(reportType === REPORT_TYPE.APPROVAL_EMPLOYEE ||
            reportType === REPORT_TYPE.PROCESS_TIME_BY_APPROVAL_EMPLOYEE) && (
            <CustomAutocomplete
              value={query.assigneeName}
              textLabel="Lãnh đạo phê duyệt"
              name="assigneeName"
              onChange={value => handleChange('assigneeName', value)}
              options={approvers || []}
            />
          )}
          {reportType === REPORT_TYPE.PROCESS_TIME && (
            <CustomAutocomplete
              value={query.taskType}
              textLabel="Thời gian xử lý"
              name="taskType"
              onChange={value => handleChange('taskType', value)}
              options={taskTypes}
            />
          )}
        </Grid>
        <Grid item md={2} xs={6}>
          <CustomAutocomplete
            value={query.frequency}
            textLabel="Tần suất"
            name="frequencies"
            onChange={value => handleChange('frequency', value)}
            options={frequencies}
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <CustomDateRangePicker
            showClearDate={false}
            fromDate={query.fromDate}
            toDate={query.toDate}
            onDateChange={handleDatesChange}
          />
        </Grid>
        <Grid
          item
          md={3}
          xs={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Tooltip title="Tìm kiếm">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 3 }}
                  onClick={onGetReports}
                  disabled={!canSeach}
                >
                  <Search />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Xuất file">
                <Button
                  // size="small"
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 3 }}
                  onClick={() => onExportFile(FILE_TYPE.XLSX)}
                  disabled={!canSeach}
                >
                  <FileCopy />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="In">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 3 }}
                  onClick={onPrintPDF}
                  disabled={!canSeach}
                >
                  <Print />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

SearchBox.propTypes = {
  reportType: PropTypes.number,
  onGetReports: PropTypes.func,
  onExportFile: PropTypes.func,
  onPrintPDF: PropTypes.func,
  sourceTypes: PropTypes.array,
  receivers: PropTypes.array,
  approvers: PropTypes.array,
  classes: PropTypes.object,
};

export default memo(SearchBox);
