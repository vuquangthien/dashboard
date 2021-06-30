/* eslint-disable react/no-array-index-key */
import React, {
  useState,
  Fragment,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { Print } from '@material-ui/icons';
import CustomFab from '../CustomButtons/Fab';

import FullscreenDialog from './FullscreenDialog';
import CustomTextField from '../CustomTextField';
import {
  DATE_FORMAT,
  REQUEST_TYPES,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../utils/constants';
import {
  convertToDateString,
  getWorkflowIOFields,
  getGroupBlood,
  getGender,
  getMarriage,
  convertNotFoundDateToString,
  convertMsToTime,
  findMinistryName,
  findBizServicesName,
} from '../../utils/common';
import useStyles from '../../utils/styles';
import { taskTypes, taskStatus } from '../../utils/workFlow';
import FieldList from '../FieldList';
import {
  VIEW_CONFIG,
  buildColumsFromRequestTypeOutputFields,
} from '../../utils/commonConfig';
import GridList from '../GridList';
import CustomLabel from '../CustomLabel';
import FilterTable from '../CustomTable/FilterTable';
import PrintRequest from '../PrintViewerPage';
import FileDetailsList from '../GridList/FileDetailsList';
import Permission from '../Permission';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
  };
}

export function RequestDetailDialog(props) {
  const {
    onClose,
    open,
    request,
    fieldNames,
    bizServices,
    ministries,
    requestResult,
    histories: historiesRes,
    permission = true,
    finishTime,
    isLoading,
    onLoadData,
  } = props;

  const { histories, recordCount } = historiesRes;
  const {
    sourceTypeDisplayName,
    requestTypeDisplayName,
    requestType,
    filterGroups,
    createdDate,
    requestCodeInt,
    comments,
  } = request;

  const memorizedDate = useMemo(() => new Date(), [request]);
  const [tabIndex, setTabIndex] = useState(0);
  const [, setInputFields] = useState([]);
  const [outputFields, setOutputFields] = useState([]);
  const [outputFieldsColumns, setOutputFieldsColumns] = useState([]);
  const returnValue =
    requestResult && requestResult.result && requestResult.result.returnValue;
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
  // const parseCmt = () => {
  //   const newArr = histories.sort((a, b) =>
  //     a.finishedDate > b.finishedDate ? -1 : 1,
  //   );
  //   return newArr[0] ? newArr[0].comments : '';
  // };
  const parseCmt = () => {
    if (histories.length > 0) {
      const foundDate = histories
        .filter(e => e.responseName === 'RS_TH_TN_GPD')
        .map(i => i.finishedDate);
      if (foundDate.length > 0) {
        const dateFinish = foundDate[foundDate.length - 1];
        const foundStatus = histories.find(e => e.finishedDate === dateFinish);
        return foundStatus && foundStatus.comments;
      }
      const newArr =
        histories[histories.length - 1] &&
        histories[histories.length - 1].comments;
      return newArr;
    }
  };
  useEffect(() => {
    if (!open) {
      setTabIndex(0);
    }
  }, [open]);
  useEffect(() => {
    if (open) {
      getWorkflowIOFields(requestType, request.requestId, fieldNames).then(
        results => {
          setInputFields(results.inputFields);
          setOutputFields(results.outputFields);
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
  const handleChangeTab = (e, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const handleClosePreviewDialog = () => {
    setOpenPrintDialog(false);
  };

  const handleOpenPreviewDialog = () => {
    // handleCloseSendDialog();
    setOpenPrintDialog(true);
    setDataPrint({
      createdUserName: request.createdUserName,
      createdDate: request.createdDate,
      sourceType: findMinistryName(ministries, request.sourceType),
      receivedDate: request.receivedDate,
      requestType: findBizServicesName(bizServices, request.requestType),
      order: request.order,
      comment: parseCmt(),
      // comment: c && c.comments,
    });
  };

  const renderMinistry = code => {
    const item = ministries && ministries.find(b => b.ministryCode === code);
    return item ? item.ministryName : '';
  };

  const classes = useStyles();
  // GRIDLIST: hoàng sửa
  // const mapDataFunction = useCallback((column, value, item) => {
  //   let name = null;
  //   for (const key in REQUEST_TYPES) {
  //     if (REQUEST_TYPES[key].includes(column.name)) name = key;
  //   }
  //   if (name) {
  //     switch (name) {
  //       case 'birthDate':
  //         if (value || value === 0) {
  //           return convertNotFoundDateToString(value);
  //         }
  //       case 'bloods':
  //         if (value || value === 0) {
  //           return getGroupBlood(value);
  //         }
  //       case 'gender':
  //         if (value || value === 0) {
  //           return getGender(value);
  //         }
  //       case 'marriage':
  //         if (value || value === 0) {
  //           return getMarriage(value);
  //         }
  //       default:
  //         return value;
  //     }
  //   }
  // hoàng sửa
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

  // TT -FILTER TABLE MAP DISPLAY NAME:
  let filterGroupsMapDisplayName = [];
  if (filterGroups && Array.isArray(filterGroups) && filterGroups.length) {
    filterGroupsMapDisplayName = filterGroups.map(item => {
      // TT - BLOOD_GROUP:
      if (
        item.filterFields[0] &&
        item.filterFields[0].filterField &&
        item.filterFields[0].filterField === 'BLOOD_GROUP' &&
        item.filterFields[0].filterValue
      ) {
        switch (item.filterFields[0].filterValue) {
          case '0':
            item.filterFields[0].filterValue = 'Chưa có thông tin';
            break;
          case 'A':
            item.filterFields[0].filterValue = 'A';
            break;
          case 'B':
            item.filterFields[0].filterValue = 'B';
            break;
          case 'AB':
            item.filterFields[0].filterValue = 'AB';
            break;
          case 'O':
            item.filterFields[0].filterValue = 'O';
            break;
          case 'KHAC':
            item.filterFields[0].filterValue = 'Khác';
            break;
          default:
            break;
        }
      }
      return item;
    });
  }

  const extendIcons = () => (
    // useCallback(
    // comment => (
    //   <>
    <Fragment>
      <Permission
        permission={FUNCTION_PERMISSIONS_MAPPING.SEARCH_PAGE.PRINT_TICKET}
      >
        <CustomFab
          onClick={() => handleOpenPreviewDialog()}
          tooltip="In phiếu"
          style={{ marginLeft: 10 }}
        >
          <Print color="primary" size="small" />
        </CustomFab>
      </Permission>
    </Fragment>
    //   </>
    // ),
    // [request],
  );
  // RENDER
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
        {permission && <Tab label="Lịch sử" {...a11yProps(1)} />}
      </Tabs>
      {/* </AppBar> */}
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <Paper className={classes.defaultPaperDetail}> */}
            <Paper className={classes.defaultPaperDetailRequests}>
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
                  {comments && (
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <>
                            <CustomLabel label="Ghi chú" value={comments} />
                          </>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
              <Grid
                container
                spacing={5}
                style={{
                  marginTop: 15,
                  height: comments ? 'calc(100% - 84px)' : 'calc(100% - 50px)',
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
                      // TT
                      filterGroups={filterGroupsMapDisplayName}
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
        <Paper className={classes.fullPage}>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3}>
                    <CustomLabel
                      label="Bộ ngành"
                      value={request && renderMinistry(request.sourceType)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomLabel label="Mã hồ sơ" value={requestCodeInt} />
                  </Grid>
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
                    <CustomLabel
                      label="Số bản ghi trả ra"
                      value={recordCount}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3}>
                    <CustomLabel
                      label="Thời gian thực hiện"
                      value={
                        request.finishedDate
                          ? convertMsToTime(
                            request.finishedDate - request.createdDate,
                          )
                          : convertMsToTime(
                            memorizedDate * 1 - request.createdDate,
                            )
                      }
                      // value={convertMsToTime(
                      //   finishTime &&
                      //     finishTime.response &&
                      //     finishTime.response.executeTime,
                      // )}
                    />
                  </Grid>
                </Grid>
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
            {/* </TableContainer> */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3} mt={10}>
                    <Typography
                      component="h5"
                      style={{ fontWeight: 'bold', marginTop: '1rem' }}
                    >
                      Kết quả tích hợp
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <FileDetailsList
              // tableConfig={VIEW_CONFIG.REQUEST_RESULT_INT}
              // onLoadData={onLoadData}
              isLoading={isLoading}
              data={returnValue}
              totalData={requestResult}
              onLoadData={onLoadData}
              // count={requestResult.length}
              columns={outputFieldsColumns}
              // onLoadData={handleLoadData}
              // onChangeSorting={handleSortData}
              // showViewConfig={false}
              // showPagination={false}
              tableHeight={387}
            />
          </Fragment>
        </Paper>
      )}
      {/* TRANG IN - PHIẾU ĐỀ XUẤT PHÊ DUYỆT */}
      <FullscreenDialog
        title="In phiếu đề xuất phê duyệt"
        open={openPrintDialog}
        onClose={handleClosePreviewDialog}
      >
        {/* NỘI DUNG TRANG IN - PHIẾU ĐỀ XUẤT PHÊ DUYỆT */}
        <PrintRequest
          onClose={handleClosePreviewDialog}
          profile={request}
          data={dataPrint}
        />
      </FullscreenDialog>
    </FullscreenDialog>
  );
}

RequestDetailDialog.propTypes = {
  requestResult: PropTypes.array,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onUpdateRequest: PropTypes.func,
  request: PropTypes.object,
  histories: PropTypes.array,
  bizServices: PropTypes.array,
  ministries: PropTypes.array,
  fieldNames: PropTypes.array,
  onLoadData: PropTypes.func,
};

export default RequestDetailDialog;
