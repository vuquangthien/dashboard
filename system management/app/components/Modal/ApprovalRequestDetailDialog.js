/* eslint-disable react/prop-types */
/* eslint-disable no-console */
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
} from '@material-ui/core';
import { Undo, NearMe } from '@material-ui/icons';
import FullscreenDialog from './FullscreenDialog';
import CustomTextField from '../CustomTextField';
import RequestConfirmDialog from './RequestConfirmDialog';
import useStyles from '../../utils/styles';
import {
  RESPONSE_CODE,
  DATE_FORMAT,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../utils/constants';
import { approvalStatus, taskTypes, taskStatus } from '../../utils/workFlow';
import {
  convertToDateString,
  getSampleContents,
  getWorkflowIOFields,
  convertMsToTime,
} from '../../utils/common';
import { sampleCode, VIEW_CONFIG } from '../../utils/commonConfig';
import CustomFab from '../CustomButtons/Fab';
import FieldList from '../FieldList';
import CustomLabel from '../CustomLabel';
import GridList from '../GridList';
import FilterTable from '../CustomTable/FilterTable';
import Permission from '../Permission';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
  };
}

export function ApprovalRequestDetailDialog(props) {
  const {
    onClose,
    open,
    onUpdateRequest,
    request,
    fieldNames,
    ministries,
    isLoading,
    histories,
    finishTime,
    currentUser,
    onShowSnackbar,
    setOpen,
    onGetApprovalRequests,
    query,
  } = props;

  const {
    sourceTypeDisplayName,
    requestTypeDisplayName,
    requestType,
    filterGroups,
    createdDate,
    requestStatus,
    requestCodeInt,
    note,
  } = request;

  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [openDenieDialog, setOpenDenieDialog] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [samples, setSamples] = useState([]);
  const [, setInputFields] = useState([]);
  const [outputFields, setOutputFields] = useState([]);
  const memorizedDate = useMemo(() => new Date(), [request]);

  useEffect(() => {
    if (!open) {
      setTabIndex(0);
    }
  }, [open]);

  const handleOpenCancelDialog = () => {
    if (
      request &&
      request.task.assigneeName &&
      request.task.assigneeName !== currentUser.userName
    ) {
      onShowSnackbar({
        content: 'H??? s?? ???? ???????c t??i kho???n kh??c ph?? duy???t',
        variant: 'error',
      });
      return;
    }
    getSampleContents(sampleCode.denie).then(data => setSamples(data));
    setOpenDenieDialog(true);
  };

  useEffect(() => {
    getWorkflowIOFields(requestType).then(results => {
      setInputFields(results.inputFields);
      setOutputFields(results.outputFields);
    });
  }, [requestType]);
  // console.log(request)
  const handleOpenApprovalDialog = () => {
    if (
      request &&
      request.task.assigneeName &&
      request.task.assigneeName !== currentUser.userName
    ) {
      onShowSnackbar({
        content: 'H??? s?? ???? ???????c t??i kho???n kh??c ph?? duy???t',
        variant: 'error',
      });
      return;
    }
    getSampleContents(sampleCode.approve).then(data => setSamples(data));
    setOpenApprovalDialog(true);
  };
  const handleChangeTab = (e, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
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

  const handleReturnRequest = useCallback(
    response => {
      const data = {
        taskId: request.taskId,
        responseName: RESPONSE_CODE.DENIE_REQUEST,
        comment: response.comment,
      };
      onUpdateRequest(data);
      setOpenDenieDialog(false);
    },
    [request],
  );

  const handleApproveRequest = useCallback(
    response => {
      const data = {
        taskId: request.taskId,
        responseName: RESPONSE_CODE.APPRORVE_REQUEST,
        comment: response.comment,
      };
      onUpdateRequest(data);
      setOpenApprovalDialog(false);
    },
    [request],
  );

  const handleCloseDenieDialog = useCallback(() => {
    setOpenDenieDialog(false);
  }, []);

  const handleCloseApprovalDialog = useCallback(() => {
    setOpenApprovalDialog(false);
  }, []);

  const renderMinistry = code => {
    const item = ministries && ministries.find(b => b.ministryCode === code);
    return item ? item.ministryName : '';
  };

  const extendIcons = useCallback(
    () => (
      <Fragment>
        <>
          <Permission
            permission={
              FUNCTION_PERMISSIONS_MAPPING.APPROVAL_PAGE.DO_NOT_APPROVAL
            }
          >
            <CustomFab
              size="small"
              onClick={handleOpenCancelDialog}
              tooltip="Kh??ng ph?? duy???t"
              disabled={isLoading}
            >
              <Undo color="primary" />
            </CustomFab>
          </Permission>
        </>
        <>
          <Permission
            permission={FUNCTION_PERMISSIONS_MAPPING.APPROVAL_PAGE.APPROVAL}
          >
            <CustomFab
              style={{ marginLeft: 10 }}
              size="small"
              onClick={handleOpenApprovalDialog}
              tooltip="Ph?? duy???t"
              disabled={isLoading}
            >
              <NearMe color="primary" />
            </CustomFab>
          </Permission>
        </>
      </Fragment>
    ),
    [],
  );

  const parseCmt = () => {
    const newArr =
      histories &&
      [...histories].sort((a, b) =>
        // const newArr = histories && histories.sort((a, b) =>
        a.finishedDate > b.finishedDate ? -1 : 1,
      );
    return newArr && newArr[0] ? newArr[0].comments : '';
    // if (histories)
    // return histories[histories.lenght-1].comments
  };

  // TT - CSS : HEIGH TABLE : 4 CASE
  let tableHeightCase = 246; // TH1.T + T = DEFAULT
  if (!parseCmt() && !note) {
    tableHeightCase = 96; // TH2.F + F
  }
  if (!parseCmt() && !!note) {
    tableHeightCase = 129; // TH3.F + T
  }
  if (!!parseCmt() && !note) {
    tableHeightCase = 213; // TH4.T + F
  }

  return (
    <FullscreenDialog
      title="Xem chi ti???t y??u c???u"
      open={open}
      onClose={onClose || handleClose}
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
        <Tab label="Xem chi ti???t" {...a11yProps(0)} />
        <Tab label="L???ch s???" {...a11yProps(1)} />
      </Tabs>
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <Paper className={classes.defaultPaperDetail}> */}
            <Paper className={classes.defaultPaperDetailApprovalRequests}>
              {/* C??CH M???I : PA 4 : task c???a L???A - ?????I TEXTBOX - TH??NH PAPER GRID - ch???t */}
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
                          label="B??? ng??nh"
                          value={sourceTypeDisplayName}
                        />
                      </Grid>
                      <Grid item>
                        <CustomLabel label="M?? h??? s??" value={requestCodeInt} />
                      </Grid>
                      <Grid item>
                        <CustomLabel
                          label="Ng??y y??u c???u"
                          value={convertToDateString(
                            createdDate,
                            DATE_FORMAT.DATE_TIME,
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <CustomLabel
                          label="Nghi???p v???"
                          value={requestTypeDisplayName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* dong 2 : n???u c?? ghi ch?? - m???i hi???n th??? d??ng n??y */}
                  {note && (
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <>
                            <CustomLabel label="Ghi ch??" value={note} />
                          </>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {/* dong 3 : n???u c?? n???i dung y/c ph?? duy???t - m???i hi???n th??? d??ng n??y */}
                {parseCmt() && (
                  <Grid item xs={12} style={{ marginTop: '1rem' }}>
                    <CustomTextField
                      readOnly
                      multiline
                      rows={4}
                      label="N???i dung g???i y??u c???u ph?? duy???t"
                      value={parseCmt() || ''}
                    />
                  </Grid>
                )}
              </Paper>
              <Stepper nonLinear>
                {approvalStatus.map(status => (
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
              {/* B???NG D?????I */}
              <Grid
                container
                spacing={5}
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
                      Danh s??ch ??i???u ki???n t??ch h???p
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
                  style={{ height: '100%', paddingBottom: '0', paddingTop: 10 }}
                >
                  <FieldList
                    // leftList={inputFields}
                    // leftTitle="D??? li???u ?????u v??o"
                    rightTitle="D??? li???u ?????u ra"
                    rightList={outputFields}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* <Grid item xs={12}>
            <FieldList
              leftList={inputFields}
              leftTitle="D??? li???u ?????u v??o"
              rightTitle="D??? li???u ?????u ra"
              rightList={outputFields}
            />
          </Grid> */}
        </Grid>
      )}
      <Permission
        permission={FUNCTION_PERMISSIONS_MAPPING.APPROVAL_PAGE.VIEW_HISTORY}
      >
        {tabIndex === 1 && (
          <Paper className={classes.defaultPaperDetail}>
            <Fragment>
              <Grid container spacing={3} justify="space-between">
                <Grid item>
                  <CustomLabel
                    label="B??? ng??nh"
                    value={request && renderMinistry(request.sourceType)}
                  />
                </Grid>
                <Grid item>
                  <CustomLabel label="M?? h??? s??" value={requestCodeInt} />
                </Grid>
                <Grid item>
                  <CustomLabel
                    label="Ng??y y??u c???u"
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
                    label="Th???i gian th???c hi???n"
                    value={
                      request.finishedDate
                        ? convertMsToTime(
                          request.finishedDate - request.createdDate,
                        )
                        : convertMsToTime(
                          memorizedDate * 1 - request.createdDate,
                          )
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
                showViewConfig={false}
                showPagination={false}
              />
              {/* <Typography
              component="h5"
              style={{ fontWeight: 'bold', marginTop: '1rem' }}
            >
              K???t qu??? t??ch h???p
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
            />
             */}
              {/* </TableContainer> */}
            </Fragment>
          </Paper>
        )}
      </Permission>
      <RequestConfirmDialog
        samples={samples}
        title="?? ki???n t??? ch???i ph?? duy???t"
        open={openDenieDialog}
        onClose={handleCloseDenieDialog}
        onSave={handleReturnRequest}
        sampleLabel="N???i dung m???u"
      />
      <RequestConfirmDialog
        samples={samples}
        title="?? ki???n ph?? duy???t"
        open={openApprovalDialog}
        onClose={handleCloseApprovalDialog}
        onSave={handleApproveRequest}
        sampleLabel="N???i dung m???u"
      />
    </FullscreenDialog>
  );
}

ApprovalRequestDetailDialog.propTypes = {
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onUpdateRequest: PropTypes.func,
  request: PropTypes.object,
  bizServices: PropTypes.array,
  ministries: PropTypes.array,
  fieldNames: PropTypes.array,
  histories: PropTypes.object,
  setOpen: PropTypes.func,
  query: PropTypes.object,
  onGetApprovalRequests: PropTypes.func,
};

export default memo(ApprovalRequestDetailDialog);
