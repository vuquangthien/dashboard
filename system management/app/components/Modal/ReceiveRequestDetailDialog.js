/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, {
  useState,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Stepper,
  Step,
  Grid,
  StepButton,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';
import { Undo, NearMe, Send, Print } from '@material-ui/icons';
import FullscreenDialog from './FullscreenDialog';
import CustomTextField from '../CustomTextField';
import RequestConfirmDialog from './RequestConfirmDialog';
import useStyles from '../../utils/styles';
import CustomLabel from '../CustomLabel';
import GridList from '../GridList';
import { VIEW_CONFIG, sampleCode } from '../../utils/commonConfig';
import {
  RESPONSE_CODE,
  WF_RECEIVE_CODE,
  DATE_FORMAT,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../utils/constants';
import { taskTypes, receiveStatus, taskStatus } from '../../utils/workFlow';
import {
  convertToDateString,
  getSampleContents,
  getWorkflowIOFields,
  // getNoteFromHistories,
  findMinistryName,
  findBizServicesName,
  convertMsToTime,
  checkHasPermission,
} from '../../utils/common';
import CustomFab from '../CustomButtons/Fab';
import FieldList from '../FieldList';
import FilterTable from '../CustomTable/FilterTable';
import PrintRequest from '../PrintViewerPage';
import Permission from '../Permission';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
  };
}

export function ReceiveRequestDetailDialog(props) {
  const {
    onClose,
    open,
    onUpdateRequest,
    request,
    fieldNames,
    bizServices,
    ministries,
    isLoading,
    histories,
    finishTime,
    currentUser,
    onShowSnackbar,
  } = props;
  const {
    sourceTypeDisplayName,
    requestTypeDisplayName,
    requestType,
    filterGroups,
    createdDate,
    requestStatus,
    requestCodeInt,
    comments,
    note,
  } = request;

  const memorizedDate = useMemo(() => new Date(), [request]);
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [samples, setSamples] = useState([]);
  const [outputFields, setOutputFields] = useState([]);
  // const [note, setNote] = useState('');

  const [openPrintDialog, setOpenPrintDialog] = useState(false);

  const [dataPrint, setDataPrint] = useState({
    createdUserName: '',
    createdDate: '',
    sourceType: '',
    receivedDate: '',
    requestType: '',
    order: '',
    comment: '',
  });

  useEffect(() => {
    getWorkflowIOFields(requestType).then(results => {
      setOutputFields(results.outputFields);
    });
  }, [requestType]);

  useEffect(() => {
    if (!open) {
      setTabIndex(0);
    }
  }, [open]);
  const handleChangeTab = (e, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const handleOpenCancelDialog = () => {
    if (
      request.task.assigneeName !== currentUser.userName &&
      (request.requestStatus === WF_RECEIVE_CODE.DENIE_REQUEST ||
        request.requestStatus === WF_RECEIVE_CODE.RECEIVE_REQUEST)
    ) {
      onShowSnackbar({
        content: 'Hồ sơ đã được tài khoản khác tiếp nhận',
        variant: 'error',
      });
      return;
    }
    getSampleContents(sampleCode.return).then(data => setSamples(data));
    setOpenReturnDialog(true);
  };

  const handleOpenSendDialog = () => {
    if (
      request.task.assigneeName !== currentUser.userName &&
      (request.requestStatus === WF_RECEIVE_CODE.DENIE_REQUEST ||
        request.requestStatus === WF_RECEIVE_CODE.RECEIVE_REQUEST)
    ) {
      onShowSnackbar({
        content: 'Hồ sơ đã được tài khoản khác tiếp nhận',
        variant: 'error',
      });
      return;
    }
    getSampleContents(sampleCode.send).then(data => setSamples(data));
    setOpenSendDialog(true);
  };

  const handleReturnRequest = useCallback(
    response => {
      const data = {
        taskId: request.taskId,
        responseName: RESPONSE_CODE.RETURN_REQUEST,
        comment: response.comment,
      };
      onUpdateRequest(data);
      setOpenReturnDialog(false);
    },
    [request],
  );
  const parseCmt = () => {
    const newArr =
      histories &&
      [...histories].sort((a, b) => (a.finishedDate > b.finishedDate ? -1 : 1));
    return newArr && newArr[0] ? newArr[0].comments : '';
  };

  const handleReceiveRequest = useCallback(() => {
    const data = {
      taskId: request.taskId,
      responseName: RESPONSE_CODE.RECEIVE_HANDLE_REQUEST,
    };
    onUpdateRequest(data);
  }, [request]);
  const mapDataFunction = useCallback((column, value) => {
    if (column.name === 'taskType') {
      // console.log('taskType');
      const data = taskTypes.find(r => r.code === value);
      // console.log(data);
      return data ? data.displayName : value;
    }
    if (column.name === 'status') {
      const statusDisplayName = taskStatus[value];
      if (statusDisplayName) return statusDisplayName;
    }
    return value;
  }, []);
  const handleSendRequest = useCallback(
    response => {
      const data = {
        taskId: request.taskId,
        responseName: RESPONSE_CODE.SEND_REQUEST,
        comment: response.comment,
      };
      onUpdateRequest(data);
      setOpenSendDialog(false);
    },
    [request],
  );

  const handleCloseReturnDialog = useCallback(() => {
    setOpenReturnDialog(false);
  }, []);

  const handleCloseSendDialog = useCallback(() => {
    setOpenSendDialog(false);
  }, []);

  const handleOpenPreviewDialog = comment => {
    console.log('vcl');
    // handleCloseSendDialog();
    setOpenPrintDialog(true);
    setDataPrint({
      createdUserName: request.createdUserName,
      createdDate: request.createdDate,
      sourceType: findMinistryName(ministries, request.sourceType),
      receivedDate: request.receivedDate,
      requestType: findBizServicesName(bizServices, request.requestType),
      order: request.order,
      comment,
    });
  };

  const handleClosePreviewDialog = () => {
    setOpenPrintDialog(false);
  };

  const renderMinistry = code => {
    const item = ministries && ministries.find(b => b.ministryCode === code);
    return item ? item.ministryName : '';
  };

  const extendIcons = useCallback(
    () => (
      <Fragment>
        <Permission
          permission={FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.RETURN}
        >
          <CustomFab
            onClick={handleOpenCancelDialog}
            disabled={isLoading}
            tooltip="Gửi trả"
          >
            <Undo color="primary" size="small" />
          </CustomFab>
        </Permission>
        {request &&
          request.requestStatus === WF_RECEIVE_CODE.WAITING_RECEIVE_REQUEST && (
            <Permission
            permission={FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.RECEIVE}
          >
            <CustomFab
              onClick={handleReceiveRequest}
                disabled={isLoading && filterGroups.length > 0}
                tooltip="Tiếp nhận"
                style={{ marginLeft: 10 }}
            >
                <NearMe color="primary" size="small" />
            </CustomFab>
          </Permission>
          )}
        <Permission
          permission={
            FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.RECEIVE_APPROVAL
          }
        >
          <CustomFab
            onClick={handleOpenSendDialog}
            disabled={isLoading && filterGroups.length > 0}
            tooltip={
              request.requestStatus === WF_RECEIVE_CODE.WAITING_RECEIVE_REQUEST
                ? 'Tiếp nhận và gửi phê duyệt'
                : 'Gửi phê duyệt'
            }
            style={{ marginLeft: 10 }}
          >
            <Send color="primary" size="small" />
          </CustomFab>
        </Permission>
      </Fragment>
    ),
    [request],
  );
  const extraAction = useCallback(
    comment => (
      <>
        <Permission
          permission={
            FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.PRINT_SUGGEST_APPROVAL
          }
        >
          <Button
            startIcon={<Print />}
            size="small"
            onClick={() => handleOpenPreviewDialog(comment)}
            color="secondary"
            variant="contained"
          >
            In
          </Button>
        </Permission>
      </>
    ),
    [request],
  );

  // TT - CSS : HEIGH TABLE : 4 CASE
  let tableHeightCase = 246; // TH1.T + T = DEFAULT
  if (!(requestStatus === 'WS_TH_PD_TC') && !note) {
    tableHeightCase = 96; // TH2.F + F
  }
  if (!(requestStatus === 'WS_TH_PD_TC') && !!note) {
    tableHeightCase = 129; // TH3.F + T
  }
  if (!!(requestStatus === 'WS_TH_PD_TC') && !note) {
    tableHeightCase = 213; // TH4.T + F
  }

  return (
    <FullscreenDialog
      title="Xem chi tiết yêu cầu"
      open={open}
      onClose={onClose}
      extendIcons={extendIcons}
    >
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        // variant="fullWidth"
        value={tabIndex || 0}
        onChange={handleChangeTab}
        arial-label=""
      >
        <Tab label="Xem chi tiết" {...a11yProps(0)} />
        {checkHasPermission(
          props.currentUser,
          FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.HISTORY,
        ) && <Tab label="Lịch sử" {...a11yProps(1)} />}
        {/* <Permission
          permission={FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.HISTORY}
        >
          <Tab label="Lịch sử" {...a11yProps(1)} />
        </Permission> */}
      </Tabs>
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.defaultPaperDetailReceiveRequests}>
              {/* CÁCH MỚI : PA 4 : task của LỤA - ĐỔI TEXTBOX - THÀNH PAPER GRID - chốt */}
              <Paper
                className={classes.control}
                style={{ margin: '0px 0px 2px' }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {/* dong 1 */}
                    <Grid container justify="space-between">
                      <Grid item>
                        <CustomLabel
                          label="Bộ ngành"
                          value={sourceTypeDisplayName}
                        />
                      </Grid>
                      <Grid item>
                        <CustomLabel label="Mã hồ sơ" value={requestCodeInt} />
                      </Grid>
                      <Grid item>
                        <CustomLabel
                          label="Ngày yêu cầu"
                          value={convertToDateString(
                            createdDate,
                            DATE_FORMAT.DATE_TIME,
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <CustomLabel
                          label="Nghiệp vụ"
                          value={requestTypeDisplayName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* dong 2 : nếu có ghi chú mới hiển thị dòng này */}
                  {note && (
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <>
                            <CustomLabel label="Ghi chú" value={note} />
                          </>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {/* DÒNG 3 : HỘP "Ý kiến từ chối phê duyệt" - chỉ hiển thị với hồ sơ có TRẠNG THÁI = "TỪ CHỐI PHÊ DUYỆT" */}
                {requestStatus === 'WS_TH_PD_TC' && (
                  <Grid item xs={12} style={{ marginTop: '1rem' }}>
                    <CustomTextField
                      readOnly
                      multiline
                      rows={4}
                      label="Ý kiến từ chối phê duyệt"
                      value={parseCmt() || ''}
                    />
                  </Grid>
                )}
              </Paper>
              {/* HẾT : task của LỤA - ĐỔI TEXTBOX - THÀNH PAPER GRID */}

              <Stepper nonLinear>
                {receiveStatus.map(status => (
                  <Step key={status.code}>
                    <StepButton
                      active={status.code === requestStatus}
                      completed={status.code === requestStatus}
                    >
                      {status.displayName}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <Grid
                container
                spacing={5}
                // TT
                style={{
                  marginTop: '-16px',
                  height: `calc(100% - ${tableHeightCase}px)`,
                }}
              >
                <Grid
                  item
                  xs={9}
                  style={{ height: '100%', overflowY: 'hidden' }}
                >
                  <Grid
                    style={{ height: '100%' }}
                    container
                    className={classes.root}
                  >
                    <Typography
                      style={{ fontSize: '0.875 rem', fontWeight: 'Bold' }}
                    >
                      Danh sách điều kiện tích hợp
                    </Typography>
                    <FilterTable
                      fieldNames={fieldNames}
                      filterGroups={filterGroups}
                      classes={classes}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ height: '100%', paddingBottom: '0' }}
                >
                  <FieldList
                    // leftList={inputFields}
                    // leftTitle="Dữ liệu đầu vào"
                    rightTitle="Dữ liệu đầu ra"
                    rightList={outputFields}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Paper className={classes.defaultPaperDetailReceiveRequests}>
          <Fragment>
            <Grid container spacing={3} justify="space-between">
              <Grid item>
                <CustomLabel
                  label="Bộ ngành"
                  value={request && renderMinistry(request.sourceType)}
                />
              </Grid>
              <Grid item>
                <CustomLabel label="Mã hồ sơ" value={requestCodeInt} />
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
                <CustomLabel
                  label="Thời gian thực hiện"
                  value={
                    request.finishedDate
                      ? convertMsToTime(
                        request.finishedDate - request.createdDate,
                      )
                      : convertMsToTime(memorizedDate * 1 - request.createdDate)
                  }
                />
              </Grid>
            </Grid>
            {/* <TableContainer component={Paper}> */}
            <GridList
              tableConfig={VIEW_CONFIG.REQUEST_HISTORY}
              // isLoading={isLoading}
              rows={histories}
              count={histories.length}
              mapDataFunction={mapDataFunction}
              // onLoadData={handleLoadData}
              // onChangeSorting={handleSortData}
              showPagination={false}
              showViewConfig={false}
            />
            {/* <Typography
              component="h5"
              style={{ fontWeight: 'bold', marginTop: '1rem' }}
            >
              Kết quả tích hợp
            </Typography>

            <GridList
              tableConfig={VIEW_CONFIG.REQUEST_RESULT_INT}
              // isLoading={isLoading}
              rows={histories}
              count={histories.length}
              mapDataFunction={mapDataFunction}
              // onLoadData={handleLoadData}
              // onChangeSorting={handleSortData}
              showViewConfig={false}
              showPagination={false}
              tableHeight={600}
            /> */}
            {/* </TableContainer> */}
          </Fragment>
        </Paper>
      )}
      <RequestConfirmDialog
        samples={samples}
        title="Lý do gửi trả hồ sơ"
        open={openReturnDialog}
        onClose={handleCloseReturnDialog}
        onSave={handleReturnRequest}
      />
      <RequestConfirmDialog
        samples={samples}
        title="Đề xuất phê duyệt hồ sơ"
        open={openSendDialog}
        onClose={handleCloseSendDialog}
        onSave={handleSendRequest}
        extraAction={extraAction}
      />
      <FullscreenDialog
        title="In phiếu đề xuất phê duyệt"
        open={openPrintDialog}
        onClose={handleClosePreviewDialog}
      >
        <PrintRequest
          onClose={handleClosePreviewDialog}
          profile={request}
          data={dataPrint}
        />
      </FullscreenDialog>
    </FullscreenDialog>
  );
}

ReceiveRequestDetailDialog.propTypes = {
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onUpdateRequest: PropTypes.func,
  request: PropTypes.object,
  bizServices: PropTypes.array,
  ministries: PropTypes.array,
  fieldNames: PropTypes.array,
};

export default memo(ReceiveRequestDetailDialog);
